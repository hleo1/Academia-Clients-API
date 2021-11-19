require("dotenv").config({path: __dirname+'/./../../.env'});
const mongoose = require("mongoose");
const URI = process.env.DB_URI;

async function connect() {
    try {
        await mongoose.connect(URI);
    } catch (err) {
        console.log("Hey");
        console.log(err);        
    }
}

connect();

module.exports = { connect };