const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const map = require('./weather')

const port = process.env.PORT || 3000 // ensures that the app.listen will use url when uploaded in cloud while 3000 if app is run locally 

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res)=>{
    res.render('index', {
        title: 'Weather App'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help page'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About page'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            message: 'No address sent!'
        })
    }

    map(req.query.address, ({name, forecast})=>{
        res.send({
            name: name,
            forecast: forecast,
        })
    })
})

// app.get('/products', (req,res)=>{
    
//     if(!req.query.test_key){
//         return res.send({
//             message: 'No product sent!'
//         })
//     }

//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req,res)=>{
    res.render('error', {
        title: '404 Error',
        message: 'Help article not found!'
    })
})

app.get('*', (req,res)=>{
    res.render('error', {
        title: '404 Error',
        message: 'My 404 Page'
    })
})

app.listen(port, ()=>{
    console.log('Server is up and running! ')
})