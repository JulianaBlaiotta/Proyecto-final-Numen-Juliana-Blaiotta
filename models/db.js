const mongoose = require("mongoose");
require("dotenv").config();

//mongoose
mongoose
    .connect (process.env.MONGODB_URI)
    .then(()=> console.log("Conectado"))
    .catch((error)=> console.error(error));

require('./client.model');