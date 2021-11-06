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
// search engine
//function search(event) {
 // event.preventDefault();
 // let cityElement = document.querySelector("#city");
 // let cityInput = document.querySelector("#city-input");
 // cityElement.innerHTML = cityInput.value;
//}



//location
function getCity(event) {
  event.preventDefault();
  let apiKey = "fd9d9da952d98d244f4e2349d84a75af";
  let search = document.querySelector("#city-input");
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${search.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

//function currentTemp(response) {
 // console.log(response.data.main.temp);
 // let showCurrentTemp = document.querySelector("#temperature");
 // showCurrentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
 // let currentLocation = document.querySelector("#city");
 // currentLocation.innerHTML = `${response.data.name}`;
//}
//display city, temp and info
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "fd9d9da952d98d244f4e2349d84a75af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function buttonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let buttonPress = document.querySelector("button");
buttonPress.addEventListener("click", buttonClick);
function formatTime(timestamp){
  let time= new Date(timestamp *1000);
  let hours = time.getHours();
  if (hours<10){hours = `0$(hours)`}
  let minutes = time.getMinutes();
  if (minutes < 10) {minutes = `0$(minutes)`
}
reurn `$(hours):${minutes}`;
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
  document.querySelector("#sunset").innerHTML = formatTime(response.data.sys.sunset);
  
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
   `http://openweathermap.org/img/wn/${response.data.weather[0].icon.04d@2x.png`
   );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

to add a button for celc or fahr
function convertToFahrenheit(event) {
 event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
 event.preventDefault();
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
