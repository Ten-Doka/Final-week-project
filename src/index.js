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

  getForecast(response.data.city);
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemp);
}

function searchCityElement(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-input-city");

  searchCity(cityElement.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="forecast-day">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="forecast-temperatures">
          <div class="maximum">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>  
          <div class="minimum">${Math.round(day.temperature.minimum)}°</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchCityButton = document.querySelector("#search-input");
searchCityButton.addEventListener("submit", searchCityElement);

searchCity("Etobicoke");
