
import { elements } from './base'

export const getInput = () => elements.searchInput.value

export const clearInput = () => {

    elements.searchInput.value = '';

}

export const clearResult = () => {

    elements.searchResultList.innerHTML = '';
    elements.searchResAndPages.innerHTML = '';


}

export const highlightSelected = id => {

    const resultArray = Array.from(document.querySelectorAll('.results__link'));

    // remove class name 
    resultArray.forEach(element => {

        element.classList.remove('results__link--active');

    });

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');

}

const limitRecipeTitle = (title, limit = 17) => {



    if (title.length > limit) {

        title = title.substring(0, 17);

        return title + "...";

    }

    return title;

}

const renderRecipes = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}.</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {

    const pages = Math.ceil(numResults / resPerPage);

    let button;

    if (page === 1 && pages > 1) {
        // only button to go to next page

        button = createButton(page, 'next');

    } else if (page < pages) {

        button = `
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
        `
    } else if (page === pages && pages > 1) {
        // last pages

        button = createButton(page, 'prev');

    }
    elements.searchResAndPages.insertAdjacentHTML('afterbegin', button);

}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //render result of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipes);

    //render pagination
    renderButtons(page, recipes.length, resPerPage);

}



