import { getFiles } from "#db/queries/files";
import { getFolder } from "#db/queries/folders";
import express from "express";
const app = express();
export default app;

app.get("/files", async (req, res) => {
  const files = await getFiles();
  for (const file of files) {
    const folder = await getFolder({ id: file.folder_id });
    file.folder_name = folder.name;
  }
  res.send(files);
});
