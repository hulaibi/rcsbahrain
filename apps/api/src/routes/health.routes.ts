import { Router } from "express";
import { databaseHealthCheck, healthCheck } from "../controllers/health.controller";

const router = Router();

router.get("/", healthCheck);
router.get("/db", databaseHealthCheck);

export default router;