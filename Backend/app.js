const express=require('express')
const cors=require('cors')
const app=express()
const path=require('path')
const port= process.env.PORT || 4001
const {database_url}=require('./config/Keys')
const mongoose=require('mongoose')

mongoose.connect(database_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("Successfully connected to mongodb")
})
mongoose.connection.on("error",()=>{
    console.log(error)
})

app.use(express.json())
app.use(cors())

require('./Models/Users')
require('./Models/Mail')

app.use(require('./Routers/index'))
app.use(require('./Routers/Auth'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('frontend/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

app.listen(port,()=>{
    console.log("Listening on port ",port)
})
