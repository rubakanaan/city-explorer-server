const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors()) // after you initialize your express app instance
require('dotenv').config();


const port= process.env.PORT;
const wData = require('./data/weather.json');
// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World!') // our endpoint function response
});
app.get('/weather',(req,res)=>{
  const respData=wData.data.map(obj => new Weather(obj));
    res.json(respData);
});
class Weather{
  constructor(wData){
    this.description=wData.weather.description;
    this.date=wData.valid_date;
    this.high=wData.max_temp;
    this.low=wData.low_temp;
  }
}
app.listen(port, () =>{
  console.log(`server start on port: ${port}`);
}
); // kick start the express server to work
