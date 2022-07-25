import express from "express";
import { deleteOrder, GetAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";
import {authorisedRoles , isAuthenticatedUser} from "../middleware/auth.js"
const router = express.Router();


router.post("/order/new",isAuthenticatedUser,newOrder);
router.get("/order/:id",isAuthenticatedUser,getSingleOrder);
router.get("/orders/me",isAuthenticatedUser,myOrders);
router.put("/admin/order/:id",isAuthenticatedUser, authorisedRoles("admin"), updateOrder);
router.delete("/admin/order/:id",isAuthenticatedUser, authorisedRoles("admin"), deleteOrder);
router.get("/admin/orders",isAuthenticatedUser, authorisedRoles("admin"), GetAllOrders);



export default router;