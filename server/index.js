const express=require('express')
const app=express()
const {PORT}= require('./scripts/config')
const cors=require('cors')
const fileupload =require('express-fileupload')
const path = require('path')
var dir = path.join(__dirname, 'uploads');
const {getdatacovidvn,getdatacovid}=require('./routes/data')

app.use(express.static(dir));
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

const categoryRouter=require('./routes/CategoryRouter')
app.use('/category',categoryRouter)


const img = require('./routes/img.js')
app.use('/img',img)


setInterval(async () => {
    await getdatacovidvn()
    await getdatacovid()
    console.log('Get data Covid19 successfully!')
}, 7200000);