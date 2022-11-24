const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '636dcf5ad3f6482424d66665',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor libero, efficitur eu sapien at, facilisis vehicula odio. Quisque fermentum semper tortor, et blandit orci posuere condimentum. In placerat, libero ac consequat imperdiet, arcu risus sodales arcu, a tincidunt purus massa id sapien.',
            images: [
                {
                  url: 'https://res.cloudinary.com/dkh8xcyrn/image/upload/v1668485033/YelpCamp/oiwlcdjh5qmb3oo4vj8e.jpg',
                  filename: 'YelpCamp/oiwlcdjh5qmb3oo4vj8e'
                },
                {
                  url: 'https://res.cloudinary.com/dkh8xcyrn/image/upload/v1668485036/YelpCamp/obngys2v1hfxfbl0plgh.jpg',
                  filename: 'YelpCamp/obngys2v1hfxfbl0plgh'
                }
              ],
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})