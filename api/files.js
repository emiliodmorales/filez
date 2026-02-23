import { Router } from "express";
const router = Router();
export default router;

import { getFiles } from "#db/queries/files";
import { getFolder } from "#db/queries/folders";

router.get("/", async (req, res) => {
  const files = await getFiles();
  for (const file of files) {
    const folder = await getFolder({ id: file.folder_id });
    file.folder_name = folder.name;
  }
  res.send(files);
});
