const api = {
    weatherKey: "62ed8bbf29d91fecfea32ed262de2cee",
    base: "https://api.openweathermap.org/data/2.5/",
    mapKey: "AIzaSyCWgpUDB2bSTHkzuxdX8RpdchBpXneQfWM"
};
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Handle click event on "Fetch Data" button
document.getElementById("fetch-data-btn").addEventListener("click", () => {
    getLocation();
    document.getElementById("weather-data").style.display = "block";
});

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${api.mapKey}`;
    const script = document.createElement("script");
    script.src = mapUrl;
    script.defer = true;
    script.async = true;
    script.onload = () => {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat, lng: lon },
            zoom: 8
        });
    };
    document.head.appendChild(script);

    const weatherUrl = `${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.weatherKey}&units=metric`;
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const location = data.name;
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;
            const timeZone = data.timezone;
            const windSpeed = data.wind.speed;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const windDirection = data.wind.deg;
            const uvIndex = data.visibility;
            const feelsLike = data.main.feels_like;

            document.getElementById("location").innerText = `Location: ${location}`;
            document.getElementById("lat").innerText = `Lat: ${latitude}`;
            document.getElementById("lon").innerText = `Long: ${longitude}`;
            document.getElementById("timezone").innerText = `TimeZone: ${timeZone}`;
            document.getElementById("wind-speed").innerText = `Wind Speed: ${windSpeed}`;
            document.getElementById("pressure").innerText = `Pressure: ${pressure}`;
            document.getElementById("humidity").innerText = `Humidity: ${humidity}`;
            document.getElementById("wind-direction").innerText = `Wind Direction: ${windDirection}`;
            document.getElementById("uv-index").innerText = `UV Index: ${uvIndex}`;
            document.getElementById("feels-like").innerText = `Feels Like: ${feelsLike}`;
        });
}