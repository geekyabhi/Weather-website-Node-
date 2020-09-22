const request=require('request')

const geocode=(address,callback)=>{
    const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJoaW5hdjE3MTIiLCJhIjoiY2tmNndya3M3MGVjaTJxbzN4Y200bGw2cSJ9.qmwBVjZ4f7_metGQfsIHkw'
    request({url:geocodeurl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the map !!',undefined)
        }else if(response.body.features==[]){
            callback('Wrong input !!',undefined)
        }else{
            callback(undefined,{
                location:response.body.features[0].text,
                lattitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1]
            })
        }
    })
}

module.exports=geocode