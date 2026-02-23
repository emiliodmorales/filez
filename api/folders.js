import { Router } from "express";
const router = Router();
export default router;

import { getFolder, getFolders } from "#db/queries/folders";
import { getFilesByFolder } from "#db/queries/files";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found.");

  req.folder = folder;
  next();
});

router.get("/:id", async (req, res) => {
  const folder = req.folder;
  folder.files = await getFilesByFolder({ folder_id: folder.id });
  res.send(folder);
});
