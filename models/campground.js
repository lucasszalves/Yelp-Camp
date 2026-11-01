const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    city: String,
    state: String,
    image: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);