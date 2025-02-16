import express from 'express';
import {signup,login,logout,getProfile} from '../controllers/auth.controller.js';
import {protectRoute} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register',signup);
router.post('/login',login);
router.post('/logout',logout);
router.get("/profile",protectRoute,getProfile);


export default router;