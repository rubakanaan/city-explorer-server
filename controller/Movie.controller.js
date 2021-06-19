const Movie = require('../models/Movie.model');
const axios = require('axios');
const Cache = require('../helper/cache')

require('dotenv').config();


const MOVIE_KEY = process.env.MOVIE_KEY;
const cacheObj = new Cache();

const movieController = (req, res) => {

    const cityName = req.query.query;

    const requestKey = `movie-${cityName}`;
    console.log(cacheObj[requestKey]);
    console.log(requestKey);




    if (cityName) {
        if (cacheObj[requestKey]) {
            console.log('--------------------');
            console.log('From Movie cache obj');
            console.log('--------------------');
            res.json(cacheObj[requestKey]);
        }

        else {

            const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${cityName}`;
            console.log(movieUrl);
            axios.get(movieUrl).then(response => {
                const result = response.data.results.map(obj => new Movie(obj));
                res.json(result)
                cacheObj[requestKey] = result;
                console.log('--------------------');
                console.log('From Movie axios');
                console.log('--------------------');
                res.json(respData)
            }).catch(error => {
                res.send(error.message);
            });

        }
    }
    else {
        res.send('please provide the proper lat and lon ');
    }


}

module.exports = movieController;