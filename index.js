//get current date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);
//to set a row of week days forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
<div class="col-2">
  <div class="weather-forecast-date">${forecastDay.dt}</div>
  <img 
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
  alt="" 
  width="42"
  />
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max" > ${forecastDay.temp.max}
°
</span> 
<span class="weather-forecast-temperature-min" > ${forecastDay.temp.min}
  °
</span> 
</div>
</div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//location
function getCity(event) {
  event.preventDefault();
  let apiKey = "fd9d9da952d98d244f4e2349d84a75af";
  let search = document.querySelector("#city-input");
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${search.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

//display city, temp and info
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "fd9d9da952d98d244f4e2349d84a75af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "fd9d9da952d98d244f4e2349d84a75af";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function buttonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let buttonPress = document.querySelector("button");
buttonPress.addEventListener("click", buttonClick);
function formatTime(timestamp) {
  let time = new Date(timestamp * 1000);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  // figure out weather app code to code times and add elements
  document.querySelector("#sunrise").innerHTML = formatTime(
    response.data.sys.sunrise
  );
  document.querySelector("#sunset").innerHTML = formatTime(
    response.data.sys.sunset
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#skies").innerHTML = response.data.weather[0].main;
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
