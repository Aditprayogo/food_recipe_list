
const axios = require('axios').default;

export default class Search {

    constructor(id) {

        this.id = id;

    };

    async getResult() {

        try {

            const res = await axios.get(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`)

            this.result = res.data.recipes


        } catch (error) {

            console.log(error)

        }

    }
}
