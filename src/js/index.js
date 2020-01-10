import Search from './models/Search';
import Recipe from './models/Recipe';

import * as searchView from './views/searchView';

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


        //4.) search for recipe
        await state.search.getResult();
        clearLoader()

        //5.) render result on UI
        searchView.renderResults(state.search.result);


    }




}

elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();

    controllerSearch();

})

elements.searchResAndPages.addEventListener('click', (e) => {

    const btn = e.target.closest('.btn-inline');

    if (btn) {

        const goToPage = parseInt(btn.dataset.goto, 10);

        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);


    }

})

// Recipe Controller
const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#', '');

    console.log(id);

    if (id) {
        // preparing UI for changes

        // create new recipe object
        state.recipe = new Recipe(id);
        // get recipe object
        await state.recipe.getRecipe();
        // callculate time
        state.recipe.calcTime();
        // callculate service
        state.recipe.calcServings();

        // render recipe
        console.log(state.recipe)

    }
}


window.addEventListener('hashchange', controlRecipe);
