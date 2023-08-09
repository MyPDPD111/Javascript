import express from 'express';
import { createProject, deleteProject, getAllProject, getOneProject, updateProject } from '../controllers/project';
import { verifyToken } from '../middlewares/CheckAuth';

const router = express.Router();


router.get('/project', getAllProject);
router.get('/project/:id', getOneProject);
router.post('/project', verifyToken, createProject);
router.put('/project/:id', verifyToken, updateProject);
router.delete('/project/:id', verifyToken, deleteProject);
module.exports = router;