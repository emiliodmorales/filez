import db from "#db/client";
import { createFile } from "#db/queries/files";
import { createFolder } from "#db/queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const FOLDER_NAMES = ["one", "two", "three"];
  const FILE_NAMES = ["one", "two", "three", "four", "five"];

  for (const folderName of FOLDER_NAMES) {
    const { id: folderId } = await createFolder({ name: folderName });

    for (const fileName of FILE_NAMES) {
      await createFile({
        name: fileName,
        folder_id: +folderId,
        size: Math.floor(Math.random() * 10000),
      });
    }
  }
}
