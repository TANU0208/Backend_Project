import express from 'express';
import itemController from "../controllers/item.controller";
import { authenticateToken } from '../middleware/auth.middleware';

const itemRoutes = express.Router();

// Public endpoints
itemRoutes.get('/items/', itemController);
itemRoutes.get('/items/:id', itemController);

// Protected endpoints
itemRoutes.post('/items/', authenticateToken, itemController);
itemRoutes.put('/items/:id', authenticateToken, itemController);
itemRoutes.delete('/items/:id', authenticateToken, itemController);

export default itemRoutes;
