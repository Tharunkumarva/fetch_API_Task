document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the REST Countries API
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            // Filter countries (Afghanistan, Åland Islands, Albania)
            const selectedCountries = data.filter(country => {
                return (
                    country.name.common === "Afghanistan" || 
                    country.name.common === "Åland Islands" ||
                    country.name.common === "Albania"
                );
            });

            // Create a row for the cards
            const row = document.createElement("div");
            row.className = "row";

            // Calculate the column width class
            const colWidthClass = `col-${12 / selectedCountries.length}`;

            // Create cards for each selected country
            selectedCountries.forEach((country, index) => {
                const card = document.createElement("div");
                card.className = colWidthClass;
                card.innerHTML = `
                    <div class="card h-100 d-flex flex-column justify-content-center align-items-center">
                        <div class="card-header bg-black text-white">
                            <strong>${country.name.common}</strong>
                        </div>
                        <div class="card-body text-center">
                            <img src="${country.flags.svg}" alt="${country.name.common}" class="img-fluid">
                            <p><strong>Capital:</strong> ${country.capital}</p>
                            <p><strong>Region:</strong> ${country.region}</p>
                            <p><strong>Country Code:</strong> ${country.cca2}</p>
                            <button class="btn btn-primary" data-country="${country.name.common}">Click for Weather</button>
                        </div>
                    </div>
                `;

                // Attach click event to the weather button
                const weatherButton = card.querySelector(".btn-primary");
                weatherButton.addEventListener("click", () => {
                    // Fetch weather data from OpenWeatherMap API based on the country name
                    fetchWeatherData(country.name.common);
                });

                // Append the card to the row
                row.appendChild(card);
            });

            // Append the row to the container
            document.querySelector(".container").appendChild(row);
        })
        .catch(error => console.error("Error fetching data: ", error));
});

function fetchWeatherData(countryName) {
    // Replace "YOUR_API_KEY" with your actual OpenWeatherMap API key
    const apiKey = "YOUR_API_KEY";
    
    // Make the API request to OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(weatherData => {
            // Handle the weather data here
            console.log("Weather Data:", weatherData);
        })
        .catch(error => console.error("Error fetching weather data: ", error));
}
