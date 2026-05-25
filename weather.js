const API_KEY = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const description = document.getElementById("description");
const errorMessage = document.getElementById("errorMessage");

/* FETCH WEATHER DATA */
async function fetchWeather(city) {
    try {
        errorMessage.textContent = "";
        weatherCard.classList.add("hidden");

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found or API request failed.");
        }

        const data = await response.json();

        renderWeather(data);

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

/* RENDER WEATHER DATA */
function renderWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = data.main.temp;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
    description.textContent = data.weather[0].description;

    weatherCard.classList.remove("hidden");
}

/* SEARCH EVENT */
function searchWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    fetchWeather(city);
}

/* BUTTON CLICK */
searchBtn.addEventListener("click", searchWeather);

/* ENTER KEY */
cityInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchWeather();
    }
});
