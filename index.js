let request = require('request');

const argv = require('yargs').argv;
let apiKey = '39f38aeeaec3e6a671b298271dc3d5af';
let city = argv.x || 'denver';
// The letter after argv is a flag used in the command line
// The letter itself is arbitrary, but will need to be referenced
// if an arg is to be assigned to argv
// Ex: node index.js -x New York City
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

// pass in a url, request returns callback function with args:
// err, response, body
request(url, function (err, response, body) {
    if(err){
        // check for error in request
        // log error if there is one
        console.log('error:', error);
    } else {
        // log the contents of the response body

        let weather = JSON.parse(body);
        let message = `It's ${weather.main.temp}F in ${weather.name}!`;
        console.log(message);
    }
});

