const express=require('express')
const path=require('path')

const app=express()

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'home.html'))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'contact.html'))
})

app.get('/announcement',(req,res)=>{
    res.sendFile(path.join(__dirname,'announce.html'))
})

app.get('/registration',(req,res)=>{
    res.sendFile(path.join(__dirname,'registration.html'))
})

const PORT=3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})