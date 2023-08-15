import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
  updateUserStatus,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Init Router.
const router = express.Router();

// Use authMiddleware.
router.use(authMiddleware);

// Routes.
router.route("/").get(getAllUser).post(createUser);
router
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateUser)
  .patch(updateUser);
router.route("/status/:id").put(updateUserStatus);

// Export router.
export default router;
