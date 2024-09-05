// routes/consultaRoutes.ts
import { Router } from "express";
import { verifyGoogleToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/auth/google", verifyGoogleToken );

export default router;