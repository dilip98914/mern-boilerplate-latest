const mongoose = require('mongoose')
module.exports = mongoose.model('products', new mongoose.Schema({
    name: String,
    slug:{type:String,unique:true},
    description: String,
    quantity: {type:Number,default:100},
    tags:{type:Array,default:[]}
}, {
    collection: 'products',
    timestamps:true
}))