var apiKey = "64d602597cd9f5d3bc5809890d14faef"

//pulls past search from local storage
var savedSearch = JSON.parse(localStorage.getItem("search-city")) || [];

if (savedSearch.length > 0) {
  //rendering the li items for previous search cities
  for(var i = 0; i < savedSearch.length; i++) {
    renderSavedCities(savedSearch[i])
  }
  //rendering last searched city
  var lastIndex = savedSearch.length - 1;
  currentWeather(savedSearch[lastIndex])
}
////create on.click event for search button
$("#search-button").on("click", function (event) {
  event.preventDefault();
  var searchCity = $("#search-text").val().trim()
  //saving it to localstorage item
  if (savedSearch.indexOf(searchCity) === -1) {
    savedSearch.push(searchCity)
    localStorage.setItem("search-city", JSON.stringify(savedSearch))
    //add li element on my sidebar
    renderSavedCities(searchCity)
  }
console.log(savedSearch)
  //calling current weather api
  currentWeather(searchCity)
})

function renderSavedCities(previousCityName) {
  var newLiElement = $("<li>")
  newLiElement.text(previousCityName)
  $("#city-search").append(newLiElement)
}

//eventlistener for li items
$("#city-search").on("click", "li", function(){
  console.log($(this).text())
 currentWeather($(this).text())
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
      var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
      $("#current-city").append(img)
      $("#current-temp").text("Temperature: " + response.main.temp + " F")
      $("#current-humid").text("Humidity: " + response.main.humidity + " %")
      $("#current-wind").text("Wind Speed: " + response.wind.speed + " MPH")



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
      $("#uv-index-value").removeClass('btn btn-warning')
      $("#uv-index-value").removeClass('btn btn-success')
      $("#uv-index-value").addClass('btn btn-danger')
    } else if (uvIndex < 5 && uvIndex > 2) {
      $("#uv-index-value").removeClass('btn btn-danger')
      $("#uv-index-value").removeClass('btn btn-success')
      $("#uv-index-value").addClass('btn btn-warning')
    } else {
      $("#uv-index-value").removeClass('btn btn-danger')
      $("#uv-index-value").removeClass('btn btn-warning')
      $("#uv-index-value").addClass('btn btn-success')
      
    }
   
    //setting up forecast values
    console.log(oneCallResponse.daily)
    var day1Date = oneCallResponse.daily[0].dt
    var date = new Date(day1Date * 1000).toLocaleDateString("en-US");
    console.log(date)
    //dates --need to convert units
    $("#card-one-date").text(date)
    var day2Date = new Date(oneCallResponse.daily[1].dt * 1000).toLocaleDateString("en-US")
    $("#card-two-date").text(day2Date)
    var day3Date = new Date(oneCallResponse.daily[2].dt * 1000).toLocaleDateString("en-US")
    $("#card-three-date").text(day3Date)
    var day4Date = new Date(oneCallResponse.daily[3].dt * 1000).toLocaleDateString("en-US")
    $("#card-four-date").text(day4Date)
    var day5Date = new Date(oneCallResponse.daily[4].dt * 1000).toLocaleDateString("en-US")
    $("#card-five-date").text(day5Date)
    //temp and humidity
    $("#card-one-temp").text("Temp: " + oneCallResponse.daily[0].temp.day + " F")
    $("#card-one-humid").text("Humidity: " + oneCallResponse.daily[0].humidity + " %")
    $("#card-two-temp").text("Temp: " + oneCallResponse.daily[1].temp.day + " F")
    $("#card-two-humid").text("Humidity: " + oneCallResponse.daily[1].humidity + " %")
    $("#card-three-temp").text("Temp: " + oneCallResponse.daily[2].temp.day + " F")
    $("#card-three-humid").text("Humidity: " + oneCallResponse.daily[2].humidity + " %")
    $("#card-four-temp").text("Temp: " + oneCallResponse.daily[3].temp.day + " F")
    $("#card-four-humid").text("Humidity: " + oneCallResponse.daily[3].humidity + " %")
    $("#card-five-temp").text("Temp: " + oneCallResponse.daily[4].temp.day + " F")
    $("#card-five-humid").text("Humidity: " + oneCallResponse.daily[4].humidity + " %")
    //weather icons
    $("#icon-one").attr("src", "http://openweathermap.org/img/w/" + oneCallResponse.daily[0].weather[0].icon + ".png");
    $("#icon-two").attr("src", "http://openweathermap.org/img/w/" + oneCallResponse.daily[1].weather[0].icon + ".png");
    $("#icon-three").attr("src", "http://openweathermap.org/img/w/" + oneCallResponse.daily[2].weather[0].icon + ".png");
    $("#icon-four").attr("src", "http://openweathermap.org/img/w/" + oneCallResponse.daily[3].weather[0].icon + ".png");
    $("#icon-five").attr("src", "http://openweathermap.org/img/w/" + oneCallResponse.daily[4].weather[0].icon + ".png");



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