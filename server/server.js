// FRAMEWORK CONFIGURATION
// --- Always Import/Require on top --- 
const express = require("express");
const connectDb = require("./config/dbConnection");

// Handles error so that the code doesnt breakdown and crash.
// Middlewares -> acts as a guard
const errorHandler = require("./middlewares/errorHandler");

// Cross-Origin Resource Sharing (CORS) is a browser security feature that allows a web page to access resources from a different domain than the one that served the page
const cors = require("cors");

// env file config
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.set('view engine' , 'hbs');

app.get('/',(req,res)=>{
    res.send("working");
});

app.get("/home",(req,res) =>{
    const user2 = {
        "name": "rachit",
        "age": "20",
    }
    const user1 = {
        "name": "walia",
        "age": "21" 
    }
    // let user = User.findOne({id:})
    res.render("home",{user1, user2})
})

app.get("/allusers", (req, res) => {
  // let user = User.findOne({id:})
  res.render("users", { users:[{id:1, username:"rachit",age:23},{id:1,username:"walia",age:24}]});
});


// APP CONFIG START
app.listen(port, () => {
    console.log(`Server running on port https://localhost:${port}`);
});

