
function currentTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#currentCity");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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
