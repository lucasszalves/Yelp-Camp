// run this file to seed database with random campgrounds!

const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://admin:admin@localhost:27017/yelp-camp?authSource=admin')
    .then((data) => { console.log('Database connected') })
    .catch((err) => { console.log('Error in database connection'); console.log(err) });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany(); // cleans database
    for (let i = 0; i < 100; i++) {
        const sampleCity = sample(cities);
        const samplePlace = sample(places);
        const sampleDesc = sample(descriptors);
        const price = Math.floor(Math.random() * 900) + 100;
        const camp = new Campground({
            title: `${samplePlace} ${sampleDesc}`,
            city: sampleCity.nome,
            state: sampleCity.estado,
            image: 'https://picsum.photos/400/400',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam eius nobis aliquid sunt hic nesciunt. Quae, aspernatur nulla praesentium, velit incidunt modi quibusdam aperiam ipsa sequi sit hic error impedit!',
            price: price
        });
        await camp.save();
    }
    console.log('Database seeded!')
}

seedDB().then(() => {
    mongoose.connection.close()
})