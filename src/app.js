const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const weather=require('./utils/weather')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app=express()


//Define path for express configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPaths=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPaths)


//Setup static directory  to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'  Weather app',
        name:'Abhinav Thakur'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About section',
        name:'Abhinav Thakur'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help section',
        name:'Abhinav Thakur'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide the address"
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
        }
        weather(lattitude,longitude,(error,{maxtemp,wind}={})=>{
            if(error){
                return res.send({error:error})
            }
            res.send({
                maxtemp:maxtemp,
                wind:wind,
                location:location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Abhinav Thakur',
        errormessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Abhinav Thakur',
        errormessage:'Page not found'
    })
})

app.listen(3001,()=>{
    console.log('Server is on port 3000')
})