const request = require('request')

const map = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6f69a80811d5d539f08709c4ae6f724b&query=${address}`

    const x = request({url: url, json:true}, (err,response) => {
        const name = response.body.location.name
        const forecast =  `It is currently ${response.body.current.temperature} degrees out. It is a ${response.body.current.weather_descriptions[0]} weather`

        callback({name: name, forecast: forecast})
        
    })
}

module.exports = map