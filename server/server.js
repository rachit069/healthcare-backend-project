// // FRAMEWORK CONFIGURATION
// // --- Always Import/Require on top --- 
// const express = require("express");
// const connectDb = require("./config/dbConnection");
// const userRoutes = require("./routes/userRoute")
// // Handles error so that the code doesnt breakdown and crash.
// // Middlewares -> acts as a guard
// const errorHandler = require("./middlewares/errorHandler");
// const doctorRoutes = require("./routes/doctorRoutes");
// const path = require("path");
// const multer = require("multer");
// const upload = multer({ dest: "./uploads" });


// // Cross-Origin Resource Sharing (CORS) is a browser security feature that allows a web page to access resources from a different domain than the one that served the page
// const cors = require("cors");

// // env file config
// const dotenv = require("dotenv");
// dotenv.config();

// connectDb();
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());
// app.use(errorHandler);

// const hbs = require("hbs");
// hbs.registerPartials(path.join(__dirname, "/views/partials"));
// app.set("view engine", "hbs");

// app.set('view engine' , 'hbs');

// app.get('/',(req,res)=>{
//     res.send("working");
// });

// app.use('/api/users', userRoutes)

// app.get("/home",(req,res) =>{
//     const user2 = {
//         "name": "rachit",
//         "age": "20",
//     }
//     const user1 = {
//         "name": "walia",
//         "age": "21" 
//     }
//     // let user = User.findOne({id:})
//     res.render("home",{user1, user2})
// })

// app.get("/allusers", (req, res) => {
//   // let user = User.findOne({id:})
//   res.render("users", { users:[{id:1, username:"rachit",age:23},{id:1,username:"walia",age:24}]});
// });

// app.use("/api/doctors", doctorRoutes); 
// app.post("/profile", upload.single("avatar"), function (req, res, next) {
//   console.log(req.body);
//   console.log(req.file);
//   return res.redirect("/home");
// });
// // app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// // APP CONFIG START
// app.listen(port, () => {
//     console.log(`Server running on port https://localhost:${port}`);
// });

// --- Imports ---
const express = require("express");
const connectDb = require("./config/dbConnection");
const userRoutes = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");
const doctorRoutes = require("./routes/doctorRoutes");
const path = require("path");
const multer = require("multer");
// const upload = multer({ dest: "./uploads" });
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
connectDb();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix)+path.extname(file.originalname);
  },
});

const upload = multer({ storage: storage });

// App Config


// Middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);
// Serve static files from "uploads" folder

// View Engine
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.set("view engine", "hbs");

// Routes
app.get('/', (req, res) => {
    res.send("working");
});

app.use('/api/users', userRoutes);

app.get("/home", (req, res) => {
    const user1 = { name: "rachit", age: "20" };
    const user2 = { name: "walia", age: "21" };
    res.render("home", { user1, user2 });
});

app.get("/allusers", (req, res) => {
    res.render("users", { users: [{ id: 1, username: "rachit", age: 23 }, { id: 2, username: "walia", age: 24 }] });
});

app.use("/api/doctors", doctorRoutes);

// Profile upload route
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log(req.body);
  console.log(req.file);

  const fileName = req.file.filename;
  const imageUrl = `/uploads/${fileName}`;
  return res.render("home", {
    imageUrl: imageUrl,
  });
});
// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
// Server Start
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
