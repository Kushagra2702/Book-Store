// app.js

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require("./routes/book-routes");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use("/books", bookRoutes); //http://localhost:5000/books/

mongoose.connect("mongodb+srv://admin:eoBEk9KPT3P8COAm@cluster0.bofrth1.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to the database");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
