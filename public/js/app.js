console.log("Application javascript file has been uploaded")

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')
const message3=document.querySelector('#message-3')
const message4=document.querySelector('#message-4')
const message5=document.querySelector('#message-5')
const loader=document.querySelector('#loader-1')
const othermsz=document.querySelector('.msz')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    // console.log(location)
    othermsz.style.visibility="hidden"
    loader.style.display="inline-block"
    message1.textContent="Loading....."
    message2.textContent=""
    message3.textContent=""
    message4.textContent=""
    message5.textContent=""

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        loader.style.display="none"
        othermsz.style.visibility="visible"
        if(data.error){
           message1.textContent=data.error
        }else{
            message1.textContent=data.location
            message2.textContent="Temperature  :  "+data.maxtemp
            message3.textContent="Wind Speed  :  "+data.wind
            message4.textContent="Humidity  :  "+data.humidity
            message5.textContent="Address  :  "+data.address
            // console.log(data.maxtemp)
            // console.log(data.wind)
            // console.log(data.address)
        }

    })
})


})