const mongoose = require("mongoose")

const connectDB = await =()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,})
        console.log(`MongoDB Connected: `);
    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB