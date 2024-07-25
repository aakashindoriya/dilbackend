const mongoose = require("mongoose")

const connect=async()=>{
    try {
       await mongoose.connect(process.env.DBURL)
        console.log("connected to db")
    } catch (error) {
        console.log("error",error)
    }
}

module.exports=connect