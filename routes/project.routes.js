const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/admin.middleware');
const { addProject, getProjects, getProjectById, updateProject, deleteProject } = require('../controllers/project.controller');
const upload = require('../config/multer');

router.post('/', authenticate, isAdmin, upload.single('projectImage'), addProject);
router.put('/:id', authenticate, isAdmin, upload.single('projectImage'), updateProject);
router.delete('/:id', authenticate, isAdmin, deleteProject);

router.get('/', getProjects);
router.get('/:id', getProjectById);

module.exports = router;