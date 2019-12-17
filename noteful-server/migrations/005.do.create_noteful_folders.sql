CREATE TABLE noteful_folders (
  id UUID PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

ALTER TABLE
  noteful_notes
ADD
  COLUMN folder_id UUID REFERENCES noteful_folders(id) ON DELETE
SET
  NULL;