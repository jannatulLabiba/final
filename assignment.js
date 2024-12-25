const weatherEmojis = {
    "Sunny": "☀️",
    "Mostly Sunny": "🌤️",
    "Partly Sunny": "⛅",
    "Intermittent Clouds": "☁️",
    "Hazy Sunshine": "🌥️",
    "Mostly Cloudy": "☁️",
    "Cloudy": "☁️",
    "Dreary": "🌫️",
    "Fog": "🌁",
    "Showers": "🌧️",
    "T-Storms": "⛈️",
    "Rain": "☔",
    "Snow": "☃️",
    "Sleet": "🌨️",
    "Hot": "🔥",
    "Cold": "🥶",
    "Windy": "🌬️",
    "Clear": "🌞",
    "Mist": "🌫️",
    "Partly Cloudy": "🌤️",
    "Patchy rain nearby": "🌦️",
    "Overcast": "☁️",
    "Patchy light drizzle": "🌨️",
    "Thundary Outbreaks in nearby": "⚡"

};

// Store active falling emojis
let activeFallingEmojis = [];


function fetchCountryData() {
    var countryName = document.getElementById("countryName").value.trim();
    if (!countryName) {
        alert("Please enter a country name!");
        return;
    }

    // Fetch country data from Rest Countries API
    var url = `https://restcountries.com/v3.1/name/${countryName}`;
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to fetch country data. Response status: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            displayCountryData(data);
        })
        .catch(function (error) {
            console.error("Error:", error);
            document.getElementById("countryData").innerHTML = `<div class="alert alert-danger">
                Failed to fetch country data. Please check the country name and try again.
            </div>`;
        });
}

function displayCountryData(countries) {
    var countryDataDiv = document.getElementById("countryData");
    countryDataDiv.innerHTML = "";

    countries.forEach(function (country) {
        var countryCard = document.createElement("div");
        countryCard.className = "country-card col-md-4";

        countryCard.innerHTML = `
            <img class="country-flag" src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <h3>${country.name.common}</h3>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <button 
    style="background-color: #00f2fe; color: #000; border: none; border-radius: 5px; padding: 10px 20px; text-shadow: 0 0 5px #00f2fe, 0 0 10pxrgb(254, 89, 0); transition: all 0.3s ease;"
    onmouseover="this.style.backgroundColor='#fff'; this.style.color='#00f2fe'; this.style.boxShadow='0 0 10px #00f2fe, 0 0 20px #00f2fe'; this.style.transform='scale(1.1)';"
    onmouseout="this.style.backgroundColor='#00f2fe'; this.style.color='#000'; this.style.boxShadow='none'; this.style.transform='scale(1)';"
    onclick="fetchWeatherData('${country.capital ? country.capital[0] : ""}', '${country.name.common}')">
    More Details
</button>`;
countryDataDiv.appendChild(countryCard);
});
}

function fetchWeatherData(city, countryName) {
    if (!city) {
        alert("No capital city found for this country.");
        return;
    }

    var weatherApiKey = "09390724b17442729dc35320240312"; // WeatherAPI key from earlier tasks
    var url = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to fetch weather data. Response status: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            displayWeatherData(data, countryName);
        })
        .catch(function (error) {
            console.error("Error:", error);
            alert("Failed to fetch weather data. Please check the API key and try again.");
        });
}

function displayWeatherData(weatherData, countryName) {
    alert(
        `Weather in ${countryName}:\n` +
        `Temperature: ${weatherData.current.temp_c}°C\n` +
        `Condition: ${weatherData.current.condition.text}\n` +
        `Humidity: ${weatherData.current.humidity}%`
    );}
    function displayForecast(weather, city, countryName) {
        var countryDataDiv = document.getElementById("countryData");
        var forecastDiv = document.createElement("div");
        forecastDiv.className = "forecast-card";
    }

function displayWeatherData(weatherData, countryName) {
    const condition = weatherData.current.condition.text;
    alert(
        `Weather in ${countryName}:\n` +
        `Temperature: ${weatherData.current.temp_c}°C\n` +
        `Condition: ${condition}\n` +
        `Humidity: ${weatherData.current.humidity}%`
    );

   
    stopFallingEmojis();
    startFallingEmojis(condition);
}
    
// Start falling emojis based on weather condition
function startFallingEmojis(weatherCondition) {
    const emoji = weatherEmojis[weatherCondition] || "🌍"; // Default emoji

    for (let i = 0; i < 20; i++) {
        const emojiElement = document.createElement("div");
        emojiElement.className = "falling-emoji";
        emojiElement.textContent = emoji;

        
        emojiElement.style.left = Math.random() * 100 + "vw";
        emojiElement.style.animationDelay = Math.random() * 5 + "s";
        emojiElement.style.fontSize = Math.random() * 2 + 1 + "rem";
        emojiElement.style.top = Math.random() * 10 + "vh"; 


        document.body.appendChild(emojiElement);
        activeFallingEmojis.push(emojiElement);

        
    emojiElement.addEventListener("animationend", () => {
    emojiElement.remove();
    });
    }
}

function stopFallingEmojis() {
    activeFallingEmojis.forEach(emoji => emoji.remove());
    activeFallingEmojis = [];
}