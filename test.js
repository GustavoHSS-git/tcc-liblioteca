const axios = require('axios');

async function test() {
    try {
        console.log("Fetching Google Books...");
        const res1 = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=ficção`);
        console.log("Google Books items count:", res1.data.items ? res1.data.items.length : 0);
        if (res1.data.items && res1.data.items.length > 0) {
            console.log("Google First item:", res1.data.items[0].volumeInfo.title);
        }
    } catch (e) {
        console.error("Google error:", e.message);
    }

    try {
        console.log("Fetching Jikan...");
        const res2 = await axios.get(`https://api.jikan.moe/v4/manga?q=shounen&limit=3&sfw=true`);
        console.log("Jikan items count:", res2.data.data ? res2.data.data.length : 0);
        if (res2.data.data && res2.data.data.length > 0) {
            console.log("Jikan First item:", res2.data.data[0].title);
        }
    } catch (e) {
        console.error("Jikan error:", e.message);
    }
}
test();
