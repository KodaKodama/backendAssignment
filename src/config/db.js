const mongoose = require('mongoose');
const dbConnection = async ()=> {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected");

    } catch(e){
        console.log(e);
        console.log("failed to connect database");
        process.exit(1);
    }
    
}

module.exports = dbConnection;