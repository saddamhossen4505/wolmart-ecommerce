import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  updateBrandStatus,
} from "../controllers/brandController.js";

// Init Router.
const router = express.Router();

// Use authMiddleware.
router.use(authMiddleware);

// Routes.
router.route("/").get(getAllBrand).post(createBrand);
router
  .route("/:id")
  .get(getSingleBrand)
  .delete(deleteBrand)
  .put(updateBrand)
  .patch(updateBrand);
router.route("/status/:id").put(updateBrandStatus);

// Export router.
export default router;
