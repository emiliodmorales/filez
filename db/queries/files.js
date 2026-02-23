import db from "#db/client";

export async function createFile({ name, size, folder_id }) {
  const SQL = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  try {
    const {
      rows: [file],
    } = await db.query(SQL, [name, size, folder_id]);
    return file;
  } catch (err) {
    console.error(err);
  }
}

export async function getFiles() {
  const SQL = `
    SELECT * FROM files
  `;
  try {
    const { rows: files } = await db.query(SQL);
    return files;
  } catch (err) {
    console.error(err);
  }
}
