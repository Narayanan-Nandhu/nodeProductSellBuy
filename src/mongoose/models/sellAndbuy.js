const mongoose = require('mongoose');

const sellBuySchema =  new mongoose.Schema ({
    productName: {
        type: String,
        required: true
    }, 
    costPrice: {
        type: Number,
        required: true
    },
    soldPrice: {
        type: Number
    }
});

const SellBuy = mongoose.model('SellBuy', sellBuySchema);

module.exports = SellBuy;