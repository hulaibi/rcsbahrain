import { Router } from "express";
import {
  getPublicNewsBySlugController,
  listPublicNewsController,
} from "../controllers/news.controller";
import { validateParams, validateQuery } from "../middlewares/validate.middleware";
import { localeQuerySchema, slugParamSchema } from "../schemas/common.schema";
import { publicNewsListQuerySchema } from "../schemas/news.schema";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get("/", validateQuery(publicNewsListQuerySchema), asyncHandler(listPublicNewsController));
router.get(
  "/:slug",
  validateParams(slugParamSchema),
  validateQuery(localeQuerySchema),
  asyncHandler(getPublicNewsBySlugController)
);

export default router;
