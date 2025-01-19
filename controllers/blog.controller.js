const Blog = require('../models/blog.model');

// Create Blog
exports.addBlog = async (req, res) => {
    try {
        const { title, description, content, publishedDate } = req.body;
        const blog = new Blog({ title, description, content, publishedDate });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Blog
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.title = req.body.title || blog.title;
        blog.description = req.body.description || blog.description;
        blog.content = req.body.content || blog.content;
        blog.publishedDate = req.body.publishedDate || blog.publishedDate;

        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        await Blog.deleteOne({ _id: req.params.id });
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};