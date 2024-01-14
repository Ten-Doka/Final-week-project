function currentTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#currentCity");
  cityElement.innerHTML = response.data.city;

  let weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}">`;

  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector(".time");
  timeElement.innerHTML = formatDate(date);

  let condition = document.querySelector(".condition");
  condition.innerHTML = response.data.condition.description;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "a15064fo064a4647d4a8bf3bt0bb11df";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(currentTemp);
}
function searchCityElement(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-input-city");

  searchCity(cityElement.value);
}
let searchCityButton = document.querySelector("#search-input");
searchCityButton.addEventListener("submit", searchCityElement);

searchCity("Etobicoke");
