const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true });

    console.log('mongoDB connected!');
};

module.exports = connectDB;

