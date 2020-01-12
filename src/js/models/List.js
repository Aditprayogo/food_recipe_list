import uniqid from 'uniqid';



export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item
    }

    deleteItem(id) {
        // nyari index
        const index = this.items.findIndex(el => el.id === id);

        // start dimana yang ditemukan , lalu ambil satu angka
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        // nyari element aslinya
        this.items.find(el => el.id === id).count == newCount;

    }
}