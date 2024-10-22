// FRAMEWORK CONFIGURATION
// --- Always Import/Require on top --- 
const express = require("express");
const connectDb = require("./config/dbConnection");

// Handles error so that the code doesnt breakdown and crash.
// Middlewares -> acts as a guard
// const errorHandler = require("./middleware/errorHandler");

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
// app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send("working");
});

// APP CONFIG START
app.listen(port, () => {
    console.log(`Server running on port https://localhost:${port}`);
});

