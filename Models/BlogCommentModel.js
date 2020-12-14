const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogCommentSchema = mongoose.Schema({
    date: { type: Date },
    blogId:{type: Schema.Types.ObjectId,ref:"Blog"},
    message: { type: String},
    parentCommentId:{type: Schema.Types.ObjectId},
    isSubComment:{type:Boolean}
}, { timestamps: true });

module.exports = mongoose.model('BlogComment', BlogCommentSchema);