/* script.js */
document.addEventListener("DOMContentLoaded", function() {
    console.log("Script Loaded");
});

function searchPlaces() {
    let query = document.getElementById("search").value.toLowerCase();
    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            let filteredResults = data.filter(place => 
                place.category.toLowerCase().includes(query)
            );
            
            if (filteredResults.length > 0) {
                filteredResults.forEach(place => {
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
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function clearResults() {
    document.getElementById("search").value = "";
    document.getElementById("results").innerHTML = "";
}
