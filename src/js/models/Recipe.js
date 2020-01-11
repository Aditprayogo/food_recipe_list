
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

        }

    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {

        const unitLongs = ['adit', 'Adit', ' Acip'];
        const unitsShort = ['add', 'adt', 'acp'];

        const newIngredients = this.ingredients.map(el => {
            // 1.) uniform the units
            let ingredient = el.toLowerCase();

            unitLongs.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // 2.) remove pranteses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            // 3.) count units and ingredient
            const arrIng = ingredient.split(' ');

            // cara nyari index yang tidak kita ketahui panjang arraynya
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;

            if (unitIndex > -1) {
                // unitnya ada di pertama
                // ex 4 1/2 cups, arrCount is (4, 1/2) ---> eval('4, 1/2') == 4,5
                // ex 4 cups arrCount is 1
                const arrCount = arrIng.slice(0, unitIndex);

                let count;

                if (arrCount.length === 1) {

                    count = eval(arrIng[0].replace('-', '+'));

                } else {

                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) {
                // there is no unit
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }

            } else if (unitIndex === -1) {
                // there is no unit no number in first possition
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }


            return objIng;
        })
        this.ingredients = newIngredients;
    }
}
