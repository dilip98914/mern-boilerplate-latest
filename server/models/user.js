const mongoose=require('mongoose')
module.exports = mongoose.model('user', new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        quote: String
    }, {
        collection: 'user',
        timestamps:true
}))