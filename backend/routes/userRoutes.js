import express from 'express';
import { loginUser, logOut, registerUser ,ForgotPassword, ResetPassword, getUserDetail, updatePassword, updateProfile,updateUserRole , GetAllUsers,GetSingleUser, deleteUser} from '../controllers/userController.js';
const router = express.Router();
import {isAuthenticatedUser,authorisedRoles} from  "../middleware/auth.js"

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/password/forgot",ForgotPassword);
router.get("/logout",logOut);
router.put("/password/reset/:token",ResetPassword);
router.get("/me",isAuthenticatedUser,getUserDetail);
router.put("/password/update",isAuthenticatedUser,updatePassword);
router.put("/me/update",isAuthenticatedUser,updateProfile);
//admin routes
router.get("/admin/users",isAuthenticatedUser,authorisedRoles("admin"),GetAllUsers);
router.get("/admin/user/:id",isAuthenticatedUser,authorisedRoles("admin"),GetSingleUser);
router.put("/admin/user/:id",isAuthenticatedUser,authorisedRoles("admin"),updateUserRole);
router.delete("/admin/user/:id",isAuthenticatedUser,authorisedRoles("admin"),deleteUser);

export default router 