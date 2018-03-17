

  // Initialize Firebase
  
 src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"
//
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAiUlKUjBYeWUm00vdlm9ORAoKUwRNnHI8",
    authDomain: "traintime-140be.firebaseapp.com",
    databaseURL: "https://traintime-140be.firebaseio.com",
    projectId: "traintime-140be",
    storageBucket: "",
    messagingSenderId: "750798606643"
  };
  firebase.initializeApp(config);


var database= firebase.database();

$(document).on("click","#submit",function(){
var train_name= $('#train_name').val()
var destination = $('#destination').val()
var first_train_time = $('#first_train_time').val()
var frequency = $('#frequency').val()

var newPostKey = firebase.database().ref().child('traintime').push().key

 train_data={
 train_train_name:train_name,
 train_destination:destination,
 train_first_train_time:first_train_time,
 train_frequency:frequency,  
 train_new_post_key:newPostKey
}

  var updates = {};
  updates[newPostKey] = train_data;
  firebase.database().ref().update(updates);

})




database.ref().on("child_added",function(childsnapshot){

var train_name=childsnapshot.val().train_train_name
var destination=childsnapshot.val().train_destination
var first_train_time=childsnapshot.val().train_first_train_time
var frequency=childsnapshot.val().train_frequency

var initial_hh=first_train_time.substr(0, 2)
var initial_mm=first_train_time.substr(4, 2)

var current_hh=moment().format('HH')
var current_mm=moment().format('mm')


 var minutes_away=frequency-((current_mm-initial_mm) % frequency)  


 var minuto=current_mm*1+minutes_away*1
  var hora=current_hh*1


  
 if(minuto>59){

   minuto=minuto-60
   hora=hora+1
   
 } 
  
 




$('.info').prepend("<tr id='request_row'>  <td>" + childsnapshot.val().train_train_name +"</td> <td>" + childsnapshot.val().train_destination +"</td> <td>" + childsnapshot.val().train_frequency +"</td> <td>" + hora + ":" + minuto +"</td> <td>" + minutes_away +"</td>  <td> <button class='delete btn ' data='"+  childsnapshot.val().train_new_post_key +"'  type='button'> Delete </button> </td>   </tr>" )
})




$(document).on("click",".delete",function(){

var key=$(this).attr('data')
var line=$(this)
database.ref(key).remove()
location.reload()
})

