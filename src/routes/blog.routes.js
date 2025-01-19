const express = require('express');
const router = express.Router();
const { 
    addBlog, 
    getBlogs, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blog.controller');

// Create Blog
router.post('/', addBlog);

// Get All Blogs
router.get('/', getBlogs);

// Get Single Blog
router.get('/:id', getBlogById);

// Update Blog
router.put('/:id', updateBlog);

// Delete Blog
router.delete('/:id', deleteBlog);

module.exports = router;