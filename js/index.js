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
            } else {
                console.error('Current weather data is not available! 😥');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data! 😣', error);
        });
});

