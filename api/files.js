import { Router } from "express";
const router = Router();
export default router;

import { getFiles } from "#db/queries/files";

router.get("/", async (req, res) => {
  const files = await getFiles();
  res.send(files);
});
