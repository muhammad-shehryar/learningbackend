const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        await mongoose.connect("string",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("mongodb connected")
    }catch(error){
        console.error(error.message)
    }
}

module.exports = connectDB;