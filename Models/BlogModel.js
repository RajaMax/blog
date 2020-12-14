const mongoose = require('mongoose');
const BlogSchema = mongoose.Schema({
    date: { type: Date },
    description: { type: String},
    author:{type:String}
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);