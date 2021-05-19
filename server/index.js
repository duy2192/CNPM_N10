const express=require('express')
const app=express()
const PORT=3000
const cors=require('cors')
const bodyParser = require('body-parser')
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.listen(PORT,()=>{
    console.log(`Server is listening on PORT: ${PORT}`)
})
app.get('/',(req,res)=>{
    res.send('Hello NodeJS')
})

const userRouter=require('./routes/UserRouter')
app.use('/users',userRouter)

const newsRouter=require('./routes/NewsRouter')
app.use('/news',newsRouter)

const data=require('./routes/data.js')
app.use('/data',data)

  
