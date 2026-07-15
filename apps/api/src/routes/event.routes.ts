import { Router } from "express";
import {
  getPublicEventBySlugController,
  listPublicEventsController,
} from "../controllers/event.controller";
import { validateParams, validateQuery } from "../middlewares/validate.middleware";
import { localeQuerySchema, slugParamSchema } from "../schemas/common.schema";
import { publicEventListQuerySchema } from "../schemas/event.schema";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get("/", validateQuery(publicEventListQuerySchema), asyncHandler(listPublicEventsController));
router.get(
  "/:slug",
  validateParams(slugParamSchema),
  validateQuery(localeQuerySchema),
  asyncHandler(getPublicEventBySlugController)
);

export default router;
