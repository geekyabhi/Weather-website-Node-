const request=require('request')

const weather=(lattitude,longitude,callback)=>{
    const weatherurl='http://api.openweathermap.org/data/2.5/forecast?lat='+lattitude+'&lon='+longitude+'&APPID=422afefbebd4f36a8304168a08d51184&units=us'
    request({url:weatherurl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather forecast !!',undefined)
        }
        else if(response.body.message && response.body.cod==400)
        {
            callback('Wrong input !!',undefined)
        }
        else{
            callback(undefined,{
                maxtemp:response.body.list[0].main.temp_max,
                wind:response.body.list[0].wind.speed
            })
        }
    })
}

module.exports=weather
