DROP TABLE IF EXISTS folders CASCADE;

CREATE TABLE
  folders (id SERIAL PRIMARY KEY, name TEXT UNIQUE NOT NULL);

DROP TABLE IF EXISTS files;

CREATE TABLE
  files (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    size INT NOT NULL,
    folder_id INT NOT NULL,
    UNIQUE (folder_id, name),
    FOREIGN KEY (folder_id) REFERENCES folders ON DELETE CASCADE
  );