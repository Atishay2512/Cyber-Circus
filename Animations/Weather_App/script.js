let apiid = "021904803ce86056d31837c5ae97c3ab";
let currentTemp = document.getElementById('temperature');
let description = document.getElementById('description');
let iconElement = document.getElementById('icon');
let humidity = document.getElementById('infoHumidity');
let wind = document.getElementById('infoWind');
let details = document.getElementById('weatherDetails');
let notFound = document.getElementById('notFound');
let container = document.getElementById('container');

async function processForm() {
    let city = document.getElementById('city').value;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiid}`);
        const WeatherData = await response.json();

        if (WeatherData && WeatherData["weather"] && WeatherData["weather"][0] && WeatherData["weather"][0]["icon"]) {
            container.style.height = "520px";
            icon.style.display = 'block';
            details.style.display = "flex";
            notFound.style.display = "none";
            currentTemp.style.display = 'block';
            description.style.display = 'inline';
            const bgUrl = new URL(`https://openweathermap.org/img/wn/${WeatherData["weather"][0]["icon"]}@4x.png`);
            iconElement.style.backgroundImage = `url(${bgUrl})`;
            currentTemp.innerHTML = Math.floor((WeatherData["main"]["temp"] - 273) * 100) / 100 + "°C";
            description.innerHTML = WeatherData["weather"][0]["main"];
            humidity.innerHTML = WeatherData["main"]["humidity"] + "%";
            wind.innerHTML = WeatherData["wind"]["speed"] + "m/s";
        } else {
            container.style.height = "410px";
            notFound.style.display = "flex";
            iconElement.style.display = "none";
            currentTemp.style.display = "none";
            description.style.display = "none";
            details.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        
    }
}
