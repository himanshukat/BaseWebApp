//$(document).ready(function(){
//  getWeather();
//})
$(document).ready(function(){
  getPosts();
})



function getWeather(searchQuery){
  var url="https://api.openweathermap.org/data/2.5/weather?q=+"+searchQuery+"+&units=imperial&appid="+apiKey;

  $(".city").text("");
  $(".temp").text("");
  $(".error-message").text("");

  $.ajax(url,{success:function(data){
    $(".city").text("City: "+data.name);
    $(".temp").text("Temperature: "+data.main.temp+" °F");
    console.log(data);
  
  }, error: function(error){
   $(".error-message").text("City not found. Please try again");
  }})
}

function searchWeather(){
  var searchQuery = $(".search").val();
  getWeather(searchQuery);
}

function getCountry(searchItem){
  var url="https://restcountries.eu/rest/v2/name/"+searchItem;

  
  $(".capital").text("");
  $(".error").text("");
  $(".country").text("");

  $.ajax(url,{success:function(data){console.log("loop");
    var i=0;
   while(i<data.length)
  {console.log(i);
    $(".country").text("Country: "+data[i].name);
    $(".capital").text("Capital: "+data[i++].capital);console.log(i);}
    console.log("loop1");
  
    console.log(data);
  
  }, error: function(error){
   $(".error").text("Country not found. Please try again");
  }})
}
function searchCountry(){
  var searchItem = $(".search").val();
  getCountry(searchItem);
}




function handleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider(); 
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(user.email);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function addMessage(postTitle,postBody){
  var postData = {
    title: postTitle,
    body: postBody
  }

  var database = firebase.database().ref("posts");
  
  var newPostRef = database.push();
newPostRef.set(postData,  function(error) {
  if (error) {
    // The write failed...
  } else {
    // Data saved successfully!
    window.location.reload();
  }
});
}

function handleMessageFormSubmit(){
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  addMessage(postTitle,postBody);
  
  
  
}

function getPosts(){

  return firebase.database().ref('posts').once('value').then(function(snapshot) {
    var posts = snapshot.val();
    console.log(posts);
    for(var postKey in posts){
      var post = posts[postKey];
      $("#post-listing").append("<div>"+post.title+" - "+post.body+"</div>");
    }
  });
}