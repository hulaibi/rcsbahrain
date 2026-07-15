import { Router } from "express";
import { getPublicPageBySlugController } from "../controllers/page.controller";
import { validateParams, validateQuery } from "../middlewares/validate.middleware";
import { localeQuerySchema, slugParamSchema } from "../schemas/common.schema";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get(
  "/:slug",
  validateParams(slugParamSchema),
  validateQuery(localeQuerySchema),
  asyncHandler(getPublicPageBySlugController)
);

export default router;
