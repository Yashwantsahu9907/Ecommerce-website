import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// Register
userRouter.post('/register', registerUser);

// Login
userRouter.post('/login', loginUser);

// Admin Login
userRouter.post('/admin', adminLogin);

export default userRouter;