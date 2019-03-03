// invokes the creation of an express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let request = require('request');

let apiKey = '39f38aeeaec3e6a671b298271dc3d5af';

// exposes public so we can use stylesheets
app.use(express.static('public'));

// middleware allows access to entered city name
app.use(bodyParser.urlencoded({ extended: true }));

// set the template engine
app.set('view engine', 'ejs');

// '/' = root URL
app.get('/', function (req, res) {
    // Use render when working with a templating language
    res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res){
    let city = req.body.city; // retrieves city from body using body-parser
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'Please enter a valid city name'});
        } else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Please enter a valid city name'})
            } else{
                let weatherText =  `It's ${weather.main.temp} degrees F in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

// server that is listening to port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});