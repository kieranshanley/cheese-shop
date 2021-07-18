const express = require("express");
const cors = require("cors");

const app = express();
// app.use(cors);

var corsOptions = {
	  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 // connect to the database
 const db = require("./models");
 db.mongoose
   .connect(db.url, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   })
   .then(() => {
     console.log("Connected to the database!");
   })
   .catch(err => {
     console.log("Cannot connect to the database!", err);
     process.exit();
   });
   
 require("./routes/cheese.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
   app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});
