const axios = require('axios');

(async function getPosts() {
    const res = await axios.get('https://facebookgraphapiserg-osipchukv1.p.rapidapi.com/getComments');
    console.log(res);
  })()

