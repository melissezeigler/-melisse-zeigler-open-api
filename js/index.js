function fetchWeather(search) {fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_direction_10m,wind_gusts_10m").then((response) => response.json())
.then((data) => console.log(data));
}

fetchWeather();

