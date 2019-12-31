import Search from './models/Search'

// global state
const state = {};

const controllerSearch = async () => {

    // 1 .) get query from the view
    const query = 'pizza';

    if (query) {
        // 2. ) New search object and add it to state

        state.search = new Search(query);

        //3) prepare UI for result

        //4.) search for recipe
        await state.search.getResult()

        //5.) render result on UI
        console.log(state.search.result)
    }




}

document.querySelector('.search').addEventListener('submit', e => {

    e.preventDefault();

    controllerSearch();

})

