const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://0.0.0.0:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63d7a4d873a8c79539547216",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dbrp3ontq/image/upload/v1675322732/YelpCamp/nyz5ljliuyjhbvwye7h0.jpg",
          filename: "YelpCamp/nyz5ljliuyjhbvwye7h0",
        },
        {
          url: "https://res.cloudinary.com/dbrp3ontq/image/upload/v1675322731/YelpCamp/ttanqxjlkk6izkyshgcd.jpg",
          filename: "YelpCamp/ttanqxjlkk6izkyshgcd",
        },
        {
          url: "https://res.cloudinary.com/dbrp3ontq/image/upload/v1675322732/YelpCamp/onkqoj0kg5hjgxygoseh.jpg",
          filename: "YelpCamp/onkqoj0kg5hjgxygoseh",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
