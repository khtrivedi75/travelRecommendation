/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");
});

// Slide effect for search
function activateSearchEffect() {
    document.body.classList.add("search-active"); // Add class to activate the slide effect
}

function searchPlaces() {
    let query = document.getElementById("search").value.trim().toLowerCase();
    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (query === "") {
        resultsContainer.innerHTML = "<p>Please enter a search keyword.</p>";
        return;
    }

    // Activate the slide effect on search
    activateSearchEffect();

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            let matchedPlaces = [];

            // Convert query into category mapping
            if (["beach", "beaches"].includes(query)) {
                matchedPlaces = data.beaches;
            } else if (["temple", "temples"].includes(query)) {
                matchedPlaces = data.temples;
            } else {
                // Check if query matches a country or city
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(query)) {
                        matchedPlaces = matchedPlaces.concat(country.cities);
                    } else {
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(query)) {
                                matchedPlaces.push(city);
                            }
                        });
                    }
                });
            }

            if (matchedPlaces.length > 0) {
                matchedPlaces.slice(0, 2).forEach(place => {
                    let placeElement = document.createElement("div");
                    placeElement.classList.add("place-card");
                    placeElement.innerHTML = `
                        <img src="images/${place.imageUrl}" alt="${place.name}">
                        <h3>${place.name}</h3>
                        <p>${place.description}</p>
                    `;
                    resultsContainer.appendChild(placeElement);
                });
            } else {
                resultsContainer.innerHTML = "<p>No results found for your search.</p>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Clear search and results
function clearResults() {
    document.getElementById("search").value = "";
    document.getElementById("results").innerHTML = "";
}
