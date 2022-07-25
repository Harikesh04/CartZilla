import express from "express";
import {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} from "../controllers/productController.js";

import {authorisedRoles , isAuthenticatedUser} from "../middleware/auth.js"
const router = express.Router();

router.get("/products", getAllproducts);
router.get("/product/:id", getProductDetails);

router.post("/admin/product/new", isAuthenticatedUser,authorisedRoles("admin"), createProduct);
router.get("/admin/products", isAuthenticatedUser,authorisedRoles("admin"), getAdminProducts);

router.put("/admin/product/:id", isAuthenticatedUser,authorisedRoles("admin"), updateProduct);

router.delete("/admin/product/:id", isAuthenticatedUser,authorisedRoles("admin"),deleteProduct);

router.put("/review",isAuthenticatedUser,createProductReview);
router.get("/reviews",isAuthenticatedUser,authorisedRoles("admin"),getProductReviews);
router.delete("/reviews",isAuthenticatedUser,authorisedRoles("admin"),deleteReview);

export default router;
