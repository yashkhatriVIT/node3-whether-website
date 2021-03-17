const request = require("request");

let forecast = (coordinates, callback) => {
    let {longitude, latitude} = coordinates;
    if(typeof longitude === 'string' || typeof latitude === 'string'){
        callback(`The corrdinates should hold a number`, undefined);
        return;
    }
    const url = `http://api.weatherstack.com/current?access_key=62905d048580e78f77974b490cd602c0&query=${latitude},${longitude}&units=f`;
    request({url, json: true}, (error, response) => {
        if(error) { 
            callback(`Unable to connect`, undefined);
        }
        else if(response.body.error) {
            callback(`${response.body.error.info}`, undefined);
        }
        else {
            let data = response.body.current;
            callback(undefined, `It is currently ${data.temperature} F out, but it feels like ${data.feelslike} F`);
        }
    })
}

module.exports = forecast;