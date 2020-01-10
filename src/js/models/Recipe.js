
const axios = require('axios').default;

export default class Search {

    constructor(id) {

        this.id = id;

    };

    async getRecipe() {

        try {

            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;


        } catch (error) {

            console.log(error);
            alert('something went wrong');

        }

    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.service = 4;
    }
}
