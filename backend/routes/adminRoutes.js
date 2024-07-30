import express from 'express';
import { adminLogin , getUsers} from '../controllers/adminController.js';
// import { protectAdmin } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post("/",adminLogin);
router.get("/getUsers", getUsers);


export default router;

