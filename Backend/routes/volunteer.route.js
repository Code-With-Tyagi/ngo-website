
import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { applyVolunteer } from "../controllers/volunteer.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// "idImage" must match frontend input name
router.post("/apply", verifyToken, upload.single("idImage"), applyVolunteer);

export default router;
