import express from 'express';
import { adminLogin, getUsers, logoutAdmin, getUserDetails, updateUserInfo,deleteUser} from "../controllers/adminController.js";
// import { protectAdmin } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post("/",adminLogin);
router.get("/getUsers", getUsers);
router.post("/logout", logoutAdmin);
router.get("/getUserInfo/:id", getUserDetails);
router.post("/updateUserInfo", updateUserInfo);
router.delete("/deleteuser/:id",deleteUser);





export default router;

