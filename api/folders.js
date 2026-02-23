import { Router } from "express";
const router = Router();
export default router;

import { getFolder, getFolders } from "#db/queries/folders";
import { createFile, getFilesByFolder } from "#db/queries/files";

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
  res.send(req.folder);
});

router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body not provided.");

  const { name, size } = req.body;
  if (!name || !size)
    return res.status(400).send("Request body is missing required fields.");

  const file = await createFile({ name, size, folder_id: req.folder.id });
  res.status(201).send(file);
});
