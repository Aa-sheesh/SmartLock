// server/routes/auth.route.js
import express from 'express';
import { signup, login, logout, getProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { loginLimiter } from '../middlewares/loginRateLimiter.js';

const router = express.Router();

router.post('/register', signup);
router.post('/login', loginLimiter, login);  // Apply the login limiter here
router.post('/logout', logout);
router.get('/profile', protectRoute, getProfile);

export default router;
