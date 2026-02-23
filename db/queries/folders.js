import db from "#db/client";

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
