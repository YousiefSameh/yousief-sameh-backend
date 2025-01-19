const Project = require('../models/project.model');
const Blog = require('../models/blog.model');

exports.getStats = async (req, res) => {
  try {
      const projectsCount = await Project.countDocuments();
      const blogsCount = await Blog.countDocuments();
      res.json({ projectsCount, blogsCount });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};