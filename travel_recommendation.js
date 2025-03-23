document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");
});

// Function to show search results
function searchPlaces() {
    let query = document.getElementById("search").value.trim().toLowerCase();
    let resultsContainer = document.getElementById("results-container");
    let mainContent = document.querySelector("main");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (query === "") {
        resultsContainer.innerHTML = "<p>Please enter a search keyword.</p>";
        return;
    }

    // Show the search results container and slide content
    resultsContainer.style.display = "block";
    resultsContainer.style.transform = "translateX(0)";
    mainContent.style.transform = "translateX(-100%)"; // Slide the main content left

    // Fetch data
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);  // Log data to check if it's fetched correctly
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
                matchedPlaces.slice(0, 5).forEach(place => {
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

// Clear search and reset layout
function clearResults() {
    document.getElementById("search").value = "";
    document.getElementById("results-container").innerHTML = "";
    document.getElementById("results-container").style.display = "none";
    document.querySelector("main").style.transform = "translateX(0)"; // Reset main content position
}
