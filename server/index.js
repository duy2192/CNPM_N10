const express=require('express')
const app=express()
const PORT=3000
const cors=require('cors')
const bodyParser = require('body-parser')
const fileupload =require('express-fileupload')
const path = require('path')
var dir = path.join(__dirname, 'uploads');
const {getdatacovidvn,getdatacovid}=require('./routes/data')

app.use(express.static(dir));
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(fileupload({
    limits:{fileSize:150*1024*1024}
}))
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

const img = require('./routes/img.js')
app.use('/img',img)


setInterval(async () => {
    await getdatacovidvn()
    await getdatacovid()
    console.log('Get data Covid19 successfully!')
}, 3000000);