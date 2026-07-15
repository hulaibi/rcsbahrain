import { Router } from "express";
import {
  createAdminNewsController,
  deleteAdminNewsController,
  getAdminNewsByIdController,
  listAdminNewsController,
  updateAdminNewsController,
} from "../controllers/news.controller";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middlewares/validate.middleware";
import { idParamSchema } from "../schemas/common.schema";
import {
  adminNewsListQuerySchema,
  createNewsSchema,
  updateNewsSchema,
} from "../schemas/news.schema";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/", validateQuery(adminNewsListQuerySchema), asyncHandler(listAdminNewsController));
router.get("/:id", validateParams(idParamSchema), asyncHandler(getAdminNewsByIdController));
router.post("/", validateBody(createNewsSchema), asyncHandler(createAdminNewsController));
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateNewsSchema),
  asyncHandler(updateAdminNewsController)
);
router.delete("/:id", validateParams(idParamSchema), asyncHandler(deleteAdminNewsController));

export default router;
