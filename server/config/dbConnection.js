// to connect database wwith server
const mongoose = require("mongoose");

const connectDb = async() => {

    // try and catch basically hum error handling k liye use krre hain
    try{
        // await -> 
        const connect = await mongoose.connect(process.env.CONNECTIONSTRING);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    }
    catch(err){
        console.log(err);
        // 1 -> fail, 0 -> pass
        process.exit(1);
    }
};

module.exports = connectDb;