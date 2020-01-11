import Search from './models/Search';
import Recipe from './models/Recipe';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

import { elements, renderLoader, clearLoader } from './views/base';

// global state
const state = {};

// Search Controller
const controllerSearch = async () => {

    // 1 .) get query from the view
    const query = searchView.getInput();

    if (query) {

        // 2. ) New search object and add it to state
        state.search = new Search(query);

        //3) prepare UI for result
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);

        try {
            //4.) search for recipe
            await state.search.getResult();
            clearLoader();

            //5.) render result on UI
            searchView.renderResults(state.search.result);

        } catch (error) {

            console.log(error)

        }

    }
}

elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();
    controllerSearch();
});


elements.searchResAndPages.addEventListener('click', (e) => {

    const btn = e.target.closest('.btn-inline');

    if (btn) {

        const goToPage = parseInt(btn.dataset.goto, 10);

        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);

    }

});

// Recipe Controller
const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#', '');

    console.log(id);

    if (id) {
        // preparing UI for changes
        recipeView.clearRecipe()
        renderLoader(elements.recipe);

        // highligit the selected item
        if (state.search) {

            searchView.highlightSelected(id);

        }

        // create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse the ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // callculate time
            state.recipe.calcTime();
            // callculate service
            state.recipe.calcServings();

            // render recipe
            clearLoader()

            recipeView.renderRecipe(state.recipe);


        } catch (error) {

            console.log(error)

        }
        // get recipe object


    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// event delegation
// handling recipe button clicks
elements.recipe.addEventListener('click', e => {

    if (e.target.matches('.btn-decrease, .btn-decrease *')) {

        //btn decrease clicked
        if (state.recipe.servings > 1) {

            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {

        // btn increase clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    }
    console.log(state.recipe);

})

