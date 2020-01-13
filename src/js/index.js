import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import { elements, renderLoader, clearLoader } from './views/base';
import Likes from './models/Likes';

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


// List controller
const controlList = () => {

    // 1.) create new list tif there is none yet
    if (!state.list) state.list = new List();

    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        // add list ke state
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        // render item ke listview
        listView.renderItem(item);
    })

}

// handle delete and update list item events
elements.shopping.addEventListener('click', e => {

    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle delete event
    if (e.target.matches('.shopping__delete, .shopping__delete * ')) {
        // delete from state
        state.list.deleteItem(id);
        // delete from UI
        listView.deleteItem(id);

    } else if (e.target.matches('.shopping__count-value')) {
        // read data from UI
        const val = parseFloat(e.target.value);
        // update UI
        state.list.updateCount(id, val);
    }


});



// Like Controller===============================
const controlLike = () => {

    if (!state.likes) state.likes = new Likes();

    const currentId = state.recipe.id;

    // jika belum di like
    if (!state.likes.isLiked(currentId)) {
        // add like to state
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // toggle the like button
        likesView.toggleLikeBtn(true);
        // add like to UI list



    } else {
        // jika sudah di like

        // Remove like to state
        state.likes.deleteLike(currentId);
        // toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like to UI list

    }

}



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

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {

        // add ingredients to shooping list
        controlList();

    } else if (e.target.matches('.recipe__love, .recipe__love *')) {

        // Like controller
        controlLike();

    }

})
