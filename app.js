const express=require('express');
const req = require('express/lib/request');
const bodyparser=require('body-parser')
const { param } = require('express/lib/router');

const fs =require('fs');
const path =require('path');
const app=express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port=8000;
///////////////defining the schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

  });
 
var contact = mongoose.model('contact', contactSchema);



////////express stufff
app.use('/static', express.static('static'));//to serve the static files

app.set('view engine', 'pug');//setting pug
app.set('views' ,path.join (__dirname ,'views'))//stting directory to pug
  
app.get('/',(req,res)=>{
   const params={};
    res.status(200).render('index.pug',params);
})
app.get('/contact',(req,res)=>{
   const params={};
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    let mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("this data has been send");
    }).catch(()=>{
        res.status(200).send("data has not been sended")
   });


   
})

app.listen(port ,()=>{
    console.log(`the port is live at the ${port}`)
})