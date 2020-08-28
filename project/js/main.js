//$(document).ready(function(){
//  getWeather();
//})



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