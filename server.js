const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors()) // after you initialize your express app instance
require('dotenv').config();


const port = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const wData = require('./data/weather.json');
const axios= require('axios');
const { response } = require('express');
// a server endpoint 
app.get('/',
  function (req, res) {
    res.send('Hello World!')
  });
app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  console.log(lat);
  if (lat && lon) {
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`
   
    axios.get(weatherUrl).then(response =>{
      const respData = response.data.data.map(obj => new Weather(obj));

     res.json(respData)
   }).catch(error=>{
     res.send(error.message );
   });
    console.log(weatherUrl);
  }
  else {
    res.send('please provide the proper lat and lon ');
  }
  
  
});
class Weather {
  constructor(wData) {
    this.description = wData.weather.description;
    this.date = wData.valid_date;
    this.high = wData.max_temp;
    this.low = wData.low_temp;
  }
}
app.listen(port, () => {
  console.log(`server start on port: ${port}`);
}
); // kick start the express server to work
