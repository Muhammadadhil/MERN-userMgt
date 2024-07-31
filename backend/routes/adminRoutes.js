import express from "express";
import { adminLogin, getUsers, logoutAdmin, getUserDetails, updateUserInfo, deleteUser } from "../controllers/adminController.js";
// import { protectAdmin } from '../middleware/authMiddleware.js';
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", adminLogin);
router.get("/getUsers", protectAdmin, getUsers);
router.post("/logout", protectAdmin, logoutAdmin);
router.get("/getUserInfo/:id", protectAdmin, getUserDetails);
router.post("/updateUserInfo", protectAdmin, updateUserInfo);
router.delete("/deleteuser/:id", protectAdmin, deleteUser);

export default router;
