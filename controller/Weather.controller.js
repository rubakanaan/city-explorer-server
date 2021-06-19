const Weather = require('../models/Weather.model');
const axios = require('axios');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const Cache = require('../helper/cache')
require('dotenv').config();

const cacheObj = new Cache();
const weatherController = (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const requestKey = `weather-${lat}-${lon}`
    console.log(cacheObj[requestKey]);
    console.log(requestKey);

    
    if (lat && lon) {
        if (cacheObj[requestKey]) {
            console.log('--------------------');
            console.log('From Weather cache obj');
            console.log('--------------------');
            res.json(cacheObj[requestKey]);
        }

        else {
            const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`

            axios.get(weatherUrl).then(response => {
                const respData = response.data.data.map(obj => new Weather(obj));
                cacheObj[requestKey] = respData;
                console.log('--------------------');
                console.log('From Weather axios');
                console.log('--------------------');
                res.json(respData)
            }).catch(error => {
                res.send(error.message);
            });
            console.log(weatherUrl);
        }
    }
    else {
        res.send('please provide the proper lat and lon ');
    }

};

module.exports = weatherController;
