const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride= require("method-override");
const ejsMate= require('ejs-mate');

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
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);


app.get("/", (req, res) => {
    res.send("Hi, i am root");
});

app.get("/Listings", async (req, res) => {
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
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs")
})

app.get("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})
app.post("/listings", async (req, res) =>{
    
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("listings");
})

app.put("/listings/:id", async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})

app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
    
})
app.get("/listings/:id/edit", async(req,res) => {
    let {id} = req.params;
    const listing  = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})





app.listen(8080, () =>{
    console.log("server is listenning to port 8080");
});