const mongoose=require('mongoose')
const {Schema}=mongoose
const {ObjectId}=Schema

const connectDatabase=async()=>{
    try{
        let uri='mongodb://da29:123456@35.240.169.246:27018/vueapp'
        let options={
            connectTimeoutMS:10000,
            useNewUrlParser:true,
            useCreateIndex:true
        }
        await mongoose.connect(uri,options)
        console.log('Connect MongoDB successfully!')
    }
    catch(error){
        console.log(`Cannot connect MongoDB. Error ${error}`)
    }
}
connectDatabase()

module.exports={mongoose}
