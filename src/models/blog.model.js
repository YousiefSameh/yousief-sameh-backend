const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
    description: {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
    content: {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
    publishedDate: { type: String, required: true },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;