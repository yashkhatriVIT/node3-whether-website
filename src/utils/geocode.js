const request = require("request");

let geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFuMTIzNDUiLCJhIjoiY2ttYnZ2ZWl3MWJlejJ3cGgzenV3cGNiaiJ9.oNW_7M6B6xW868jFHEMMdQ&limit=1`;
    request({url, json: true},(error, response) => {
        if(error)
        {
            callback(`Unable to connect`, undefined);
            
        }
        else if(response.body.message){
            callback(`${response.body.message}`, undefined);
        }
        else if(response.body.features.length === 0)
        {
            callback(`The serarch term is not availabel in our database`, undefined);
        }
        else{
            let longitude = response.body.features[0].geometry.coordinates[0];
            let latitude = response.body.features[0].geometry.coordinates[1];
            let location = response.body.features[0].place_name;
            callback(undefined, {longitude, latitude, location});
        }   
    });
}

module.exports = geocode;