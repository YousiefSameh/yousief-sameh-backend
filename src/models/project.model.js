const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectTitle: {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
    projectSubtitle: {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
    projectURL: { type: String, required: true },
    projectGithubURL: { type: String, required: true },
    projectImage: {
        public_id: { type: String },
        url: { type: String }
    },
    category: {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;