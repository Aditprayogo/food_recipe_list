export default class Likes {

    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, image) {

        const like = { id, title, author, image }

        this.likes.push(like)

        // persist data and local storage
        this.persistData();
        return like;
    }

    deleteLike(id) {
        // nyari index
        const index = this.likes.findIndex(el => el.id === id);

        // start dimana yang ditemukan , lalu ambil satu angka
        this.likes.splice(index, 1);

        // persis data to local storage
        this.persistData();
    }

    isLiked(id) {

        return this.likes.findIndex(el => el.id === id) != -1;

    }

    getNumLikes() {

        return this.likes.length;
    }

    persistData() {

        // convert ke json string
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {

        const storage = JSON.parse(localStorage.getItem('likes'));

        // restoring likes from local storage
        if (storage) {
            this.likes = storage;
        }

    }


}