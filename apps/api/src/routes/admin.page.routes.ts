import { Router } from "express";
import {
  createAdminPageController,
  deleteAdminPageController,
  getAdminPageByIdController,
  listAdminPagesController,
  updateAdminPageController,
} from "../controllers/page.controller";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middlewares/validate.middleware";
import { idParamSchema } from "../schemas/common.schema";
import { adminPageListQuerySchema, createPageSchema, updatePageSchema } from "../schemas/page.schema";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/", validateQuery(adminPageListQuerySchema), asyncHandler(listAdminPagesController));
router.get("/:id", validateParams(idParamSchema), asyncHandler(getAdminPageByIdController));
router.post("/", validateBody(createPageSchema), asyncHandler(createAdminPageController));
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updatePageSchema),
  asyncHandler(updateAdminPageController)
);
router.delete("/:id", validateParams(idParamSchema), asyncHandler(deleteAdminPageController));

export default router;
