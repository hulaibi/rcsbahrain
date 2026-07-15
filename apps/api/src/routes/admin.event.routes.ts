import { Router } from "express";
import {
  createAdminEventController,
  deleteAdminEventController,
  getAdminEventByIdController,
  listAdminEventsController,
  updateAdminEventController,
} from "../controllers/event.controller";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middlewares/validate.middleware";
import { idParamSchema } from "../schemas/common.schema";
import {
  adminEventListQuerySchema,
  createEventSchema,
  updateEventSchema,
} from "../schemas/event.schema";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/", validateQuery(adminEventListQuerySchema), asyncHandler(listAdminEventsController));
router.get("/:id", validateParams(idParamSchema), asyncHandler(getAdminEventByIdController));
router.post("/", validateBody(createEventSchema), asyncHandler(createAdminEventController));
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateEventSchema),
  asyncHandler(updateAdminEventController)
);
router.delete("/:id", validateParams(idParamSchema), asyncHandler(deleteAdminEventController));

export default router;
