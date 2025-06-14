const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');

// for database
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// for main fun call
main().then((res) => {

    console.log("connected to db");

}).catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.send("Hi, i am root");
});

app.get("/Listing", async (req, res) => {
       const allListing = await Listing.find({});
       res.render("listings/index.ejs",{allListing});
});

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Mp , Nsp",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080, () =>{
    console.log("server is listenning to port 8080");
});