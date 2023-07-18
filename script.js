// variables
var googleMapsApiKey = "";
var openWeatherApiKey = "http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={8686e0fe4732b6b364f3c95d6dfcf09c}";

// Backup for Google Maps - API Key from Bing Maps then Mapquest/Radar
// var mapquestApiKey = "prj_test_pk_ef08dfd3ed0a8748c5d83db178b8283bcdf5c539";
var bingMapsApiKey = "AjuFMgDNUeVWcHGU633JdkzIGhbOjzM6-ruaD9QyJr4RPe4AHW-qEug1BK1URiom";

// Backup for Open Weather - API Key from RapidAPI
var rapidApiKey = "b9b932d13amshd7a22bc43c9b9cep19e1b4jsn54e36226b53c";

// variable search area and button
var searchText = document.querySelector("#search-box");
var searchBtn = document.querySelector("#searchButton");
var searchedCities = document.querySelector("#searchedCities");
var searchedCityEL = document.querySelector("#location-search");

var cityName = document.querySelector("#city-name");
var airEl = document.querySelector("#air");

// variable to hold map container
var mapContainer = document.querySelector(".map-container");
var mapOne = document.querySelector("#map-one");
var mapEl = document.querySelector("#mapone");

searchedCityEL.style.display = 'none';

renderSearchHistory();

// variables to handle maps
// var googleMaps = ;
// var openWeather = ;

// get lat and long

// search button event listener

searchBtn.addEventListener("click", function () {
    console.log(searchText.value);
    citySearch(searchText.value);
    saveCity(searchText.value);

});

// function saveTheCityBtn(locateCity) {
//   var searchingButton = document.createElement("button");
//   searchingButton.classList.add("btn", "btn-outline-secondary", "w-100");
//   searchingButton.textContent = locateCity;
//   searchedCities.appendChild(searchingButton);
//   searchingButton.addEventListener("click", function (event) {
//       var citySearched = event.target.textContent;
//       saveCityList(citySearched);
//   });
// }

function renderSearchHistory() {
  searchedCities.innerHTML = "";
  var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
  if (savedCities.length) {
    for (let index = 0; index < savedCities.length; index++) {
      var searchingButton = document.createElement("button");
      searchingButton.classList.add("btn", "btn-outline-secondary", "w-100");
      searchingButton.textContent = savedCities[index];
      searchedCities.appendChild(searchingButton);
      searchingButton.addEventListener("click", function (event) {
          var citySearched = event.target.textContent;
          saveCityList(citySearched);
      });

    }
  }
}

function saveCityList(citySearched) {
  citySearch(citySearched)
  searchText.classList.remove('col-12')
  searchText.classList.add('col-4')
  searchedCityEL.style.display = '';
}

// Save in localStorage
function saveCity(citySearched) {
  var savedCities = localStorage.getItem("savedCities");
  if (savedCities) {
      savedCities = JSON.parse(savedCities);
  } else {
      savedCities = [];
  }
  if (!savedCities.includes(citySearched)) {
    savedCities.push(citySearched);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }
  renderSearchHistory();
}

// Save the searched cities
function saveTheBtns() {
  var savedCities = localStorage.getItem("savedCities");
  if (savedCities) {
      savedCities = JSON.parse(savedCities);
      savedCities.innerHTML = "";
      for (let i = 0; i < savedCities.length; i++) {
          saveTheCityBtn(savedCities[i]);
      }
  }
}

//googlemap
function myMap(lat, lon) {
    var mapProp = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 8,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}


// function for search
function citySearch(cityName) {
    var airQuality;
    // if (searchResults === "Good" || searchResults === "Fair" || searchResults === "Moderate" || searchResults === "Poor" || searchResults === "Very Poor") {
    //     airQuality = searchResults;
    //     return;
    // }

    var apiKeyAir = "8686e0fe4732b6b364f3c95d6dfcf09c";
    var apiUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKeyAir;

    // only need function inside fetch if you need to create a function
    fetch(apiUrlGeo)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            var { lat, lon, name } = response[0];
            getQuality(lat, lon, name);
            myMap(lat, lon);
        });
}

// Fetch the air quality
function getQuality(lat, lon, name) {
    var apiKeyAir = "8686e0fe4732b6b364f3c95d6dfcf09c";
    var apiUrlAir = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKeyAir}`;
    fetch(apiUrlAir)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var { aqi } = response.list[0].main;
            renderAirQuality(aqi, name);
        });
};



function getAirQuality(response) {

// display an icon to represent good, fair, moderate, poor, very poor and we create our own scale

function renderAirQuality(aqi, cityName) {
    airEl.innerHTML = "";
    var nameOfCity = document.createElement("h2");
    var airQualityEl = document.createElement("h3");
    nameOfCity.textContent = cityName;
    var airQuality;
    if (aqi == 1) {
        airQuality = "Air quality is good" + " 🔵";
    }
    if (aqi == 2) {
        airQuality = "Air quality is fair" + " 🟢";
    }
    if (aqi == 3) {
        airQuality = "Air quality is moderate" + " 🟡";
    }
    if (aqi == 4) {
        airQuality = "Air quality is poor" + " 🟠";
    }
    if (aqi == 5) {
        airQuality = "Air quality is very poor" + " 🔴";

    }
    airQualityEl.textContent = airQuality;
    airEl.append(nameOfCity, airQualityEl);