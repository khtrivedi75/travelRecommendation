document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");

    const btnSearch = document.getElementById("btnSearch"); // Correcting button id
    const btnReset = document.getElementById("btnReset"); // Reset button
    const inputField = document.getElementById("conditionInput"); // Corrected input field id
    const resultDiv = document.getElementById("results"); // Div to show search results

    // Add event listeners for the buttons
    btnSearch.addEventListener("click", searchPlaces);
    btnReset.addEventListener("click", clearResults);

    function searchPlaces() {
        const input = inputField.value.trim().toLowerCase(); // Sanitize input
    
        if (!input) {
            resultDiv.innerHTML = 'Please enter a valid search term.';
            return;
        }
    
        // Fetch data from the JSON file
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                let filteredConditions = [];
    
                console.log("User search input:", input);
    
                // Match conditions based on the keyword input
                if (input.includes('beach')) {
                    filteredConditions = data.beaches;
                } else if (input.includes('temple')) {
                    filteredConditions = data.temples;
                } else {
                    // If input contains "country", return all countries
                    if (input.includes('country')) {
                        filteredConditions = data.countries;
                    } else {
                        // Search for country names directly (like "Brazil", "Japan")
                        filteredConditions = data.countries.filter(country => 
                            country.name.toLowerCase().includes(input)
                        );
                    }
                }
    
                // Check if any results are found
                if (filteredConditions.length > 0) {
                    resultDiv.innerHTML = ""; // Clear previous results
                    
                    filteredConditions.forEach(condition => {
                        if (condition.cities) {
                            // If it's a country with cities, display cities
                            condition.cities.forEach(city => {
                                resultDiv.innerHTML += `
                                    <div class="result-item">
                                        <img src="${city.imageUrl}" alt="${city.name}">
                                        <div class="result-text">
                                            <h2>${city.name}</h2>
                                            <p><strong>Description:</strong> ${city.description}</p>
                                        </div>
                                    </div>
                                `;
                            });
                        } else {
                            // If it's a single temple or beach
                            resultDiv.innerHTML += `
                                <div class="result-item">
                                    <img src="${condition.imageUrl}" alt="${condition.name}">
                                    <div class="result-text">
                                        <h2>${condition.name}</h2>
                                        <p><strong>Description:</strong> ${condition.description}</p>
                                    </div>
                                </div>
                            `;
                        }
                    });
                } else {
                    resultDiv.innerHTML = 'No recommendations found for the given keyword.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = 'An error occurred while fetching data.';
            });
    }function searchPlaces() {
        const input = inputField.value.trim().toLowerCase(); // Sanitize input
    
        if (!input) {
            resultDiv.innerHTML = 'Please enter a valid search term.';
            return;
        }
    
        // Fetch data from the JSON file
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                let filteredConditions = [];
    
                console.log("User search input:", input);
    
                // Match conditions based on the keyword input
                if (input.includes('beach')) {
                    filteredConditions = data.beaches;
                } else if (input.includes('temple')) {
                    filteredConditions = data.temples;
                } else {
                    // If input contains "country", return all countries
                    if (input.includes('country')) {
                        filteredConditions = data.countries;
                    } else {
                        // Search for country names directly (like "Brazil", "Japan")
                        filteredConditions = data.countries.filter(country => 
                            country.name.toLowerCase().includes(input)
                        );
                    }
                }
    
                // Check if any results are found
                if (filteredConditions.length > 0) {
                    resultDiv.innerHTML = ""; // Clear previous results
                    
                    filteredConditions.forEach(condition => {
                        if (condition.cities) {
                            // If it's a country with cities, display cities
                            condition.cities.forEach(city => {
                                resultDiv.innerHTML += `
                                    <div class="result-item">
                                        <img src="${city.imageUrl}" alt="${city.name}">
                                        <div class="result-text">
                                            <h2>${city.name}</h2>
                                            <p><strong>Description:</strong> ${city.description}</p>
                                        </div>
                                    </div>
                                `;
                            });
                        } else {
                            // If it's a single temple or beach
                            resultDiv.innerHTML += `
                                <div class="result-item">
                                    <img src="${condition.imageUrl}" alt="${condition.name}">
                                    <div class="result-text">
                                        <h2>${condition.name}</h2>
                                        <p><strong>Description:</strong> ${condition.description}</p>
                                    </div>
                                </div>
                            `;
                        }
                    });
                } else {
                    resultDiv.innerHTML = 'No recommendations found for the given keyword.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = 'An error occurred while fetching data.';
            });
    }
        

/*    function searchPlaces() {
        const input = inputField.value.trim().toLowerCase(); // Sanitize input
    
        if (!input) {
            resultDiv.innerHTML = 'Please enter a valid search term.';
            return;
        }
    
        // Fetch data from the JSON file
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                let filteredConditions = [];
    
                console.log("User search input:", input);
    
                // Match conditions based on the keyword input
                if (input.includes('beach')) {
                    filteredConditions = data.beaches;
                } else if (input.includes('temple')) {
                    filteredConditions = data.temples;
                } else {
                    // If input contains "country", return all countries
                    if (input.includes('country')) {
                        filteredConditions = data.countries;
                    } else {
                        // Search for country names directly (like "Brazil", "Japan")
                        filteredConditions = data.countries.filter(country => 
                            country.name.toLowerCase().includes(input)
                        );
                    }
                }
    
                // Check if any results are found
                if (filteredConditions.length > 0) {
                    resultDiv.innerHTML = ""; // Clear previous results
                    
                    filteredConditions.forEach(condition => {
                        if (condition.cities) {
                            // If it's a country with cities, display cities
                            condition.cities.forEach(city => {
                                resultDiv.innerHTML += `
                                    <div class="result-item">
                                        <h2>${city.name}</h2>
                                        <img src="${city.imageUrl}" alt="${city.name}" style="max-width: 300px; display: block; margin-top: 10px;">
                                        <p><strong>Description:</strong> ${city.description}</p>
                                    </div>
                                `;
                            });
                        } else {
                            // If it's a single temple or beach
                            resultDiv.innerHTML += `
                                <div class="result-item">
                                    <h2>${condition.name}</h2>
                                    <img src="${condition.imageUrl}" alt="${condition.name}" style="max-width: 300px; display: block; margin-top: 10px;">
                                    <p><strong>Description:</strong> ${condition.description}</p>
                                </div>
                            `;
                        }
                    });
                } else {
                    resultDiv.innerHTML = 'No recommendations found for the given keyword.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = 'An error occurred while fetching data.';
            });
    }*/

    // Function to clear the results
    function clearResults() {
        inputField.value = "";
        resultDiv.innerHTML = "";
    }
});
