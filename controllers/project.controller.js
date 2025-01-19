const Project = require('../models/project.model');
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer');

// Create Project
exports.addProject = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const project = new Project({
            projectTitle: req.body.projectTitle,
            projectSubtitle: req.body.projectSubtitle,
            projectURL: req.body.projectURL,
            projectGithubURL: req.body.projectGithubURL,
            projectImage: {
                public_id: result.public_id,
                url: result.secure_url
            },
            category: req.body.category,
        });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Project
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Update image if new file is uploaded
        if (req.file) {
            await cloudinary.uploader.destroy(project.projectImage.public_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            project.projectImage = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        // Update other fields
        project.projectTitle = req.body.projectTitle || project.projectTitle;
        project.projectSubtitle = req.body.projectSubtitle || project.projectSubtitle;
        project.projectURL = req.body.projectURL || project.projectURL;
        project.projectGithubURL = req.body.projectGithubURL || project.projectGithubURL;
        project.category = req.body.category || project.category;

        await project.save();
        res.json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await cloudinary.uploader.destroy(project.projectImage.public_id);

        await Project.findByIdAndDelete(req.params.id);

        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};