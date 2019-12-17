CREATE TYPE example_category AS ENUM (
  'Listicle',
  'How-to',
  'News',
  'Interview',
  'Story'
);

ALTER TABLE
  blogful_examples
ADD
  COLUMN style example_category;