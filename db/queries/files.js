import db from "#db/client";

/**
 * Creates a new file in the files table
 * @param {Object} file - The new file to create
 * @param {string} file.name - The name of the new file
 * @param {number} file.size - The size of the new file
 * @param {number} file.folder_id - The id of the folder to insert the file
 * @returns The newly created file
 */
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

/**
 * Retrieves all the files from the database
 * @returns An array of all files
 */
export async function getFiles() {
  const SQL = `
    SELECT files.*, folders.name AS folder_name
    FROM files
    LEFT JOIN folders
    ON files.folder_id = folders.id
  `;
  try {
    const { rows: files } = await db.query(SQL);
    return files;
  } catch (err) {
    console.error(err);
  }
}
