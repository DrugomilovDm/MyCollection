const express = require('express')
const sequelize =require('./db')
const fileUpload=require('express-fileupload')
const path  =require('path')

const app=express()
const PORT = 5000

app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname,'files')))
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/col',require('./routes/collection.routes'))
app.use('/api/item',require('./routes/item.routes'))
app.use('/api/tag',require('./routes/tag.routes'))
app.use('/api/like',require('./routes/like.routes'))

async function start(){
    try{
        await  sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT,()=> console.log('App has been started on port '+PORT))
    }
    catch (e){
        console.log('Server Error',e.message)
        process.exit(1);
    }
}
start();