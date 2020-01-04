import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

// global state
const state = {};

const controllerSearch = async () => {

    // 1 .) get query from the view
    const query = searchView.getInput();

    if (query) {

        // 2. ) New search object and add it to state
        state.search = new Search(query);

        //3) prepare UI for result
        searchView.clearInput();
        searchView.clearResult();

        //4.) search for recipe
        await state.search.getResult();

        //5.) render result on UI
        searchView.renderResults(state.search.result);


    }




}

elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();

    controllerSearch();

})

