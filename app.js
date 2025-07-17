
let difficulty = document.getElementById("difficulty");
let cuisine = document.getElementById("cuisine");
let main = document.querySelector(".main");
let search = document.getElementById("search");
let allRecipes = [];

function api() {

    fetch('https://dummyjson.com/recipes')
        .then(res => res.json())
        .then(data => {
            allRecipes = data.recipes;
            console.log(allRecipes);

            let difficultyOptions = [];
            let cuisineOptions = [];

            difficulty.innerHTML = `<option value="All">All-difficulty</option>`;
            cuisine.innerHTML = `<option value="All">All-cuisine</option>`;


            allRecipes.forEach(recipe => {
                if (!difficultyOptions.includes(recipe.difficulty)) {
                    difficultyOptions.push(recipe.difficulty);
                    difficulty.innerHTML += `<option value="${recipe.difficulty}">${recipe.difficulty}</option>`;
                };
                if (!cuisineOptions.includes(recipe.cuisine)) {
                    cuisineOptions.push(recipe.cuisine);
                    cuisine.innerHTML += `<option value="${recipe.cuisine}">${recipe.cuisine}</option>`;
                }

            });

            renderCards(allRecipes);

            function applyFilters() {
                let selectedDifficulty = difficulty.value;
                let selectedCuisine = cuisine.value;
                let searchText = search.value.trim().toLowerCase();

                let filtered = allRecipes.filter(recipe => {
                    let matchDifficulty = selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;
                    let matchCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
                    let matchSearch = recipe.name.toLowerCase().includes(searchText);
                    return matchDifficulty && matchCuisine && matchSearch;

                });
                renderCards(filtered);
            };

            difficulty.addEventListener("change", applyFilters);
            cuisine.addEventListener("change", applyFilters);
            search.addEventListener("input", applyFilters);
        });



};

function renderCards(recipes) {
    main.innerHTML = "";
    if (recipes.length === 0) {
        main.innerHTML = "<p>No recipes found.</p>";
        return;
    };
    recipes.forEach(recipe => {
        main.innerHTML += `
        <div class="card" data-id="${recipe.id}">       
            <img class="gallery" src="${recipe.image}" alt="${recipe.name}">
            <p><strong>${recipe.name}</strong></p>
            <p>Cuisine: ${recipe.cuisine}</p>
            <p>Difficulty: ${recipe.difficulty}</p>
        </div>
        `;
    });
};

main.addEventListener("click", function (e) {
    if (e.target.classList.contains("gallery")) {
        const card = e.target.closest(".card");
        const recipeId = card.getAttribute("data-id");
        localStorage.setItem("selectedRecipeId", recipeId);
        window.location.href = "index1.html";
    }
});

api();



// const difficulty = document.getElementById("difficulty");
// const cuisine = document.getElementById("cuisine");
// const main = document.querySelector(".main");
// const search = document.getElementById("search");

// let allRecipes = [];

// const api = () => {
//     fetch('https://dummyjson.com/recipes')
//         .then(res => res.json())
//         .then(data => {
//             allRecipes = data.recipes;
//             populateFilters(allRecipes);
//             renderCards(allRecipes);
//             setupFilterEvents();
//         });
// };

// const populateFilters = (recipes) => {
//     const difficulties = new Set();
//     const cuisines = new Set();

//     difficulty.innerHTML = `<option value="All">All-difficulty</option>`;
//     cuisine.innerHTML = `<option value="All">All-cuisine</option>`;

//     recipes.forEach(({ difficulty: diff, cuisine: cui }) => {
//         difficulties.add(diff);
//         cuisines.add(cui);
//     });

//     difficulties.forEach(diff => {
//         difficulty.innerHTML += `<option value="${diff}">${diff}</option>`;
//     });

//     cuisines.forEach(cui => {
//         cuisine.innerHTML += `<option value="${cui}">${cui}</option>`;
//     });
// };

// const applyFilters = () => {
//     const selectedDifficulty = difficulty.value;
//     const selectedCuisine = cuisine.value;
//     const searchText = search.value.trim().toLowerCase();

//     const filtered = allRecipes.filter(recipe => {
//         const matchDifficulty = selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;
//         const matchCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
//         const matchSearch = recipe.name.toLowerCase().includes(searchText);
//         return matchDifficulty && matchCuisine && matchSearch;
//     });

//     renderCards(filtered);
// };

// const setupFilterEvents = () => {
//     difficulty.addEventListener("change", applyFilters);
//     cuisine.addEventListener("change", applyFilters);
//     search.addEventListener("input", applyFilters);
// };

// const renderCards = (recipes) => {
//     main.innerHTML = "";

//     if (recipes.length === 0) {
//         main.innerHTML = "<p>No recipes found.</p>";
//         return;
//     }

//     recipes.forEach(recipe => {
//         main.innerHTML += `
//             <div class="card" data-id="${recipe.id}">       
//                 <img class="gallery" src="${recipe.image}" alt="${recipe.name}">
//                 <p><strong>${recipe.name}</strong></p>
//                 <p>Cuisine: ${recipe.cuisine}</p>
//                 <p>Difficulty: ${recipe.difficulty}</p>
//             </div>
//         `;
//     });
// };

// // ✅ Click on image to redirect with ID
// main.addEventListener("click", (e) => {
//     if (e.target.classList.contains("gallery")) {
//         const card = e.target.closest(".card");
//         const recipeId = card.getAttribute("data-id");
//         localStorage.setItem("selectedRecipeId", recipeId);
//         window.location.href = "index1.html";
//     }
// });

// api();
