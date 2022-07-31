const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sellAndBuy').then((value) => {
    console.info('Connect to Mongo DB');
    return;
}).catch((err) => {
    console.error('Error in connecting to Mongo Db')
})