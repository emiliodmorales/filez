import { Router } from "express";
const router = Router();
export default router;

import { getFolders } from "#db/queries/folders";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});
