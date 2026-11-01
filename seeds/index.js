// run this file to seed database with random campgrounds!

const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://admin:admin@localhost:27017/yelp-camp?authSource=admin')
    .then((data) => { console.log('Database connected') })
    .catch((err) => { console.log('Error in database connection'); console.log(err) });

const sample = array => array[Math.floor(Math.random() * array.length)];

const validPicsumImgIds = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 27, 28, 29, 33, 35, 37, 46, 50, 54, 62, 66, 67, 69, 70, 71, 76, 79, 81, 83, 93, 94, 95, 109, 110, 112, 116, 120, 121, 125, 127, 128, 136, 165, 166, 168, 170, 177, 190, 191, 198, 202, 206, 216, 222, 229, 231, 235, 241, 243, 251, 254, 255, 256, 277, 278, 282, 287, 289, 291, 294, 301, 313, 316]

const seedDB = async () => {
    await Campground.deleteMany(); // cleans database
    for (let i = 0; i < 50; i++) {
        const sampleCity = sample(cities);
        const samplePlace = sample(places);
        const sampleDesc = sample(descriptors);
        const price = Math.floor(Math.random() * 900) + 100;
        const sampleImgId = sample(validPicsumImgIds);
        const camp = new Campground({
            title: `${samplePlace} ${sampleDesc}`,
            city: sampleCity.nome,
            state: sampleCity.estado,
            image: `https://picsum.photos/id/${sampleImgId}/400/400`,
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