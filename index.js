const express = require("express");
const cors = require("cors");
const { json } = require("express");
const {PORT} = require("./config/config")
const connectDB = require("./config/dbConn")
const mongoose = require("mongoose");
const colors = require("colors");
const app = express();


connectDB();

// cross origin resource sharing
app.use(cors({
  origin: "*"
}));


// middleware to handle url encoded data
app.use(express.urlencoded({ extended: false }));

// middleware to handle json data
app.use(json());


app.use("/todos", require("./routes/routes"));


mongoose.connection.once("open", () => {
    console.log(`Connected to MongoDB`.cyan.underline)
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
})