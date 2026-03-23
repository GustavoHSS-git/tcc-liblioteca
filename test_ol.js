const axios = require('axios');
(async () => {
    try {
        const res = await axios.get('https://openlibrary.org/search.json?q=fic%C3%A7%C3%A3o&limit=1', {
            headers: { 'User-Agent': 'TCCLibraryApp/1.0 (contato@meutcc.com)' }
        });
        console.log(JSON.stringify(res.data.docs[0], null, 2));
    } catch (e) {
        console.error(e.message);
        if (e.response) console.error(e.response.status, e.response.data);
    }
})();
