var googleMapsApiKey = "";
var openWeatherApiKey = "http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={8686e0fe4732b6b364f3c95d6dfcf09c}";

var searchText = document.querySelector("#search-box");
var searchBtn = document.querySelector("#searchButton");
var searchedCities = document.querySelector("#searchedCities");
var cityName = document.querySelector("#city-name");
var airEl = document.querySelector("#air");

var mapContainer = document.querySelector(".map-container");
var mapOne = document.querySelector("#map-one");
var mapEl = document.querySelector("#mapone");

searchBtn.addEventListener("click", function (e) {
    citySearch(searchText.value);
});

function citySearch(searchResults) {
    var airQuality;
    if (searchResults === "Good" || searchResults === "Fair" || searchResults === "Moderate" || searchResults === "Poor" || searchResults === "Very Poor") {
        airQuality = searchResults;
        return;
    }

    var apiKeyAir = "8686e0fe4732b6b364f3c95d6dfcf09c";
    var apiUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKeyAir;
    console.log("inside citySearch", searchResults);

    fetch(apiUrlGeo)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        var {lat, lon, name} = response[0];
        getQuality(lat, lon, name);
    });
}

function getQuality(lat, lon, name) {

        });