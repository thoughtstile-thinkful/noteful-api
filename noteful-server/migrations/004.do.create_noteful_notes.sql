CREATE TABLE noteful_notes (
  id UUID PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  modified TIMESTAMP NOT NULL,
  content TEXT
);