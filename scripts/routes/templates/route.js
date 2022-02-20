/**
 *
 * @param {string} controller controller name
 * @returns {string} route template
 */
export const routeTemplate = (
  controller,
) => `import { ${controller} } from "../controllers";
import { Router } from "express";

const router = Router();

router.get("/", ${controller});

export default router;
`;
