require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')

const TodoModel = require('./Models/Todo')


const app = express()
app.use(cors())
app.use(express.json())

const port =process.env.PORT || 3001
const mongoConnectionString =Process.env.URI
mongoose.connect(mongoConnectionString)
.then(()=>{
    console.log("mongoose connected");
    app.listen(port, ()=>{
        console.log("server is running on port" + port)

    });

}).catch((err)=>{
    console.log("Error connecting to mongdb",err)
})


app.get('/get',(req,res)=>{
   TodoModel.find()
   .then(result=>res.json(result))
   .catch(err => res.json(err)) 
})

app.post('/add',(req,res) => {
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
  const {id} =req.params;
  TodoModel.findByIdAndDelete(id)
  .then(result => res.json(result))
  .catch(err =>res.json(err))  
})

// app.listen (3001,()=>{
//     console.log('server is running')
// })