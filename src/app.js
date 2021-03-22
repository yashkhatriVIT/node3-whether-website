const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
let port = process.env.PORT || 3000;

let myPath = path.join(__dirname, '../public');
let viewPath = path.join(__dirname, '../templates/views');
let partialPath = path.join(__dirname, '../templates/partials');
app.use(express.static(myPath))


app.set('views', viewPath)
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Whether App',
        name: 'Yash'
    });
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Yash'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'We are here to provide ypu with any kind of technical assistance',
        name: 'Yash'
    });
})

app.get('/whether', (req, res) =>{
    if(!req.query.address)
    {
        return res.send({
            error: "Enter the Address field"
        })
    }
    geocode(req.query.address, (error, response = {}) => {
        if(error) res.send({error: error});
        else {
            let data = {
                longitude: response.longitude,
                latitude: response.latitude
            };
            forecast(data, (err, responsed) => {
                if(err){
                    res.send(err);
                }
                else{
                    res.send({
                       location: response.location,
                       forecast: responsed
                    });
                }
            })
        }
    });
});

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "Enter the Seach field"
        });
    }
    console.log(req.query.search);
    return res.send =({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404',
        errorMessage: 'The help article is not found',
        name: 'Yash'
    });
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        errorMessage: "Page Not found",
        name: 'Yash'
    });
})


app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`);
})