const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creation of schema
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "default-image",
        },
        url: {
            type: String,
            default: "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            set: (v) =>
                v === ""
                    ? "https://unsplash.com/photos/stone-stairs-lead-to-a-beautiful-white-building-B8JID1Gt_BU"
                    : v,
        },
    },
    price: Number,
    location: String,
    county: String,
});

// creation of model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
