import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import authController from '../controllers/auth.controller';

const authRoutes = express.Router();

authRoutes.post('/login', authController);
authRoutes.post('/logout', authenticateToken, authController);
authRoutes.post('/register', authController);

export default authRoutes;
