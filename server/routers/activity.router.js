import express from "express"
import activityController from "../controllers/activity.controller.js"
// import authMiddleware from "../middleware/authJwt"
const router = express.Router();

// POST /api/v1/auth/activity
// router.post("/",authMiddleware.verifyToken,authMiddleware.isTescher, activityController.create)

//create
router.post("/",activityController.create);

//getAll
router.get("/",activityController.getAll)

//getById
router.get("/:id",activityController.getById)

router.put("/:id",activityController.update)

router.delete("/:id",activityController.deleteById)

export default router; 