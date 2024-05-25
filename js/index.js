document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&wind_speed_unit=mph`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.current_weather) {
                const weatherData = data.current_weather;
                document.getElementById('temperature').textContent = weatherData.temperature;
                document.getElementById('windSpeed').textContent = weatherData.windspeed;
                document.getElementById('windDirection').textContent = weatherData.winddirection;
                document.getElementById('weatherData').classList.remove('hidden');
                document.getElementById('forecastData').classList.add('hidden');
                document.querySelector('#coordinates a').classList.add('hidden'); // Hide the link
            } else {
                console.error('Current weather data is not available! 😥');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data! 😣', error);
        });
});

document.getElementById('forecastButton').addEventListener('click', function() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&forecast_days=14`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.daily) {
                const forecastList = document.getElementById('forecastList');
                forecastList.innerHTML = '';

                data.daily.time.forEach((day, index) => {
                    const maxTemp = data.daily.temperature_2m_max[index];
                    const minTemp = data.daily.temperature_2m_min[index];
                    const listItem = document.createElement('div');
                    listItem.innerHTML = `${day}: Max Temp: ${maxTemp} °F <br> Min Temp: ${minTemp} °F`;
                    forecastList.appendChild(listItem);
                });

                document.getElementById('forecastData').classList.remove('hidden');
                document.getElementById('weatherData').classList.add('hidden');
                document.querySelector('#coordinates a').classList.add('hidden'); 
            } else {
                console.error('14-day forecast data is not available! 😥');
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data! 😣', error);
        });
});

// Add full-width class to About section
document.getElementById('forecastButton').addEventListener('click', function() {
    document.getElementById('about').classList.add('full-width');
});

// Remove full-width class from About section
document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('about').classList.remove('full-width');
    document.querySelector('#coordinates a').classList.remove('hidden'); // Show the link
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('weatherData').classList.add('hidden');
    document.getElementById('forecastData').classList.add('hidden');
});

document.getElementById('resetCoordinates').addEventListener('click', function() {
    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
});

