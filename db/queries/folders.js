import db from "#db/client";

/**
 * Create a new folder in the folders table
 * @param {Object} folder - The new folder to create
 * @param {string} folder.name - The name of the new folder
 * @returns The newly created folder
 */
export async function createFolder({ name }) {
  const SQL = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *
  `;
  try {
    const {
      rows: [folder],
    } = await db.query(SQL, [name]);
    return folder;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Retrieves all the folders from the database
 * @returns An array of all folders
 */
export async function getFolders() {
  const SQL = `
    SELECT * FROM folders
  `;
  try {
    const { rows: folders } = await db.query(SQL);
    return folders;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Retrieves a folder from the folder table by id
 * @param {Object} folder - The folder to search for
 * @param {number} folder.id - The id of the folder to search for
 * @returns The folder with the given id
 * @returns undefined if there is no folder with the given id
 */
export async function getFolder({ id }) {
  const SQL = `
    SELECT * FROM folders
    WHERE id = $1
  `;
  try {
    const {
      rows: [folder],
    } = await db.query(SQL, [id]);
    return folder;
  } catch (err) {
    console.error(err);
  }
}
