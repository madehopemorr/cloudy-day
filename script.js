var apiKey = "64d602597cd9f5d3bc5809890d14faef"
//starting sidebar search words
var sideCities = ["Atlanta", "Austin", "New Orleans"]
//pulls past search from local storage
var savedSearch = localStorage.getItem("searched word")

if (localStorage.getItem("initialSearchTerm")) {
  var initialSearch = localStorage.getItem("initialSearchTerm")
  runSearchBar(initialSearch)
  sideCities.push(initialSearch.charAt(0).toUpperCase() + initialSearch.slice(1))
  renderSearchHistory(initialSearch)
}
////create on.click event for search button
$("#search-button").on("click", function (event) {
  event.preventDefault();
  var searchCity = $("#search-text").val().trim()
  sideCities.push(searchCity.charAt(0).toUpperCase() + searchCity.slice(1))
  localStorage.setItem("searched city", searchCity)
  //runSearchBar(searchCity);
  //renderSearchHistory();
  //calling current weather api
  currentWeather(searchCity)
})

//one call
//get 
function currentWeather(cityName) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response)
      $("#current-city").text(response.name)
      $("#current-temp").text("Temperature: " + response.main.temp)
      $("#current-humid").text("Humidity: " + response.main.humidity)
      $("#current-wind").text("Wind Speed: " + response.wind.speed)

      //need to look in api for what to run above
      var lat = response.coord.lat
      var lon = response.coord.lon
      oneCallWeather(lat, lon)
    })
}
function oneCallWeather(lat, lon) {

  var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&exclude=minutely,hourly,alerts&units=imperial";

  //uv index
  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function (oneCallResponse) {
    console.log("oneCallWeather response")
    console.log(oneCallResponse)
    var uvIndex = oneCallResponse.current.uvi
    $("#uv-index-value").text(uvIndex)
    
    if (uvIndex > 5) {
      $("#uv-index-value").addClass('severe')
    } else if (uvIndex < 5 && uvIndex > 2) {
      $("#uv-index-value").addClass('moderate')
    } else {
      $("#uv-index-value").addClass('favorable')
    }

    //setting up forecast values
    console.log(oneCallResponse.daily)
    var day1Date = oneCallResponse.daily[0].dt
    var date = new Date(day1Date).toLocaleDateString("en-US");
      console.log(date)
      //dates --need to convert units
      $("#card-one-date").text(oneCallResponse.daily[0].dt)
      $("#card-two-date").text(oneCallResponse.daily[1].dt)
      $("#card-three-date").text(oneCallResponse.daily[2].dt)
      $("#card-four-date").text(oneCallResponse.daily[3].dt)
      $("#card-five-date").text(oneCallResponse.daily[4].dt)
      //temp and humidity
      $("#card-one-temp").text(oneCallResponse.daily[0].temp.day)
      $("#card-one-humid").text(oneCallResponse.daily[0].humidity)
      $("#card-two-temp").text(oneCallResponse.daily[1].temp.day)
      $("#card-two-humid").text(oneCallResponse.daily[1].humidity)
      $("#card-three-temp").text(oneCallResponse.daily[2].temp.day)
      $("#card-three-humid").text(oneCallResponse.daily[2].humidity)
      $("#card-four-temp").text(oneCallResponse.daily[3].temp.day)
      $("#card-four-humid").text(oneCallResponse.daily[3].humidity)
      $("#card-five-temp").text(oneCallResponse.daily[4].temp.day)
      $("#card-five-humid").text(oneCallResponse.daily[4].humidity)
      

    
  })
  
}

// allows view to previous searches on click
$(document).on("click", ".searchedCity", function () {
  runSearchBar($(this).attr("data-name"));
})
//renderSearchHistory();


//searchBtn.addEventListener



//make API key with openweather api

//inside search button, grab search text, assign to variable.
//then do an ajax
//type GET
//queryURL append search text
//first ajax call is current weather
//make ajax call for UV index
//uv index button will change background color based on the uv index value -3 green, -7 orange/yellow, +7 is red
//on.click weather search store search items in local storage
//localstorage.setItem
//to show the items inside <ul> do show localstorage.getItem
//get current history, if any
//var cityList = JSON.parse(localStorage.getItem("whateveridyougive")) || [];
//write for loop, loop through all items in city list, and show city names inside the <ul>