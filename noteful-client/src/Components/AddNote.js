import React, { useState, useEffect } from 'react';

const getUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // eslint-disable-next-line
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function AddNote(props) {
  const [name, setName] = useState('');
  const [select, setSelect] = useState('NoName');
  const [content, setContent] = useState('');
  const [addNoteClicked, setAddNoteClicked] = useState(false);

  let folders = props.store.folders;

  useEffect(() => {
    // Default Selection
    if (select === 'NoName') {
      setSelect(() =>
        props.store.folders[0] === undefined
          ? 'NoName'
          : props.store.folders[0].name
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleSubmit = event => {
    event.preventDefault();

    async function addNote(newNote) {
      await fetch(`http://localhost:9090/notes`, {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
          'content-type': 'application/json'
        }
      });
      console.log(`sent ${newNote.name}`);
      props.setStoreChange(storeChange => storeChange + 1);
    }

    let timeModified = new Date().toJSON();

    let newNote = {
      id: getUuid(),
      name: name,
      modified: timeModified,
      folderId: folders.find(folder => folder.name === select).id,
      content: content
    };

    if (validateNewNote(newNote)) {
      addNote(newNote);
    }
  };

  function validateNewNote(note) {
    // Testing the name.
    let nameValidation = stringValidator(note.name, 'NAME');
    let contentValidation = stringValidator(note.content, 'CONTENT');

    return nameValidation && contentValidation;

    function stringValidator(string, name) {
      if (string.length === 0 || string.length > 20) {
        alert(`${name}: Length must be between 0-20 characters.`);
        return false;
      } else if (!/[a-zA-Z]/.test(string)) {
        alert(`${name}: Must contain at least 1 letter.`);
      } else {
        return true;
      }
    }
  }

  return (
    <>
      <button onClick={() => setAddNoteClicked(true)}>Add Note:</button>
      {addNoteClicked ? (
        <form onSubmit={handleSubmit}>
          <span>name: </span>
          <input value={name} onChange={e => setName(e.target.value)}></input>
          <br></br>
          <span>folder: </span>
          <select onChange={e => setSelect(e.target.value)}>
            {folders.map((folder, i) => (
              <option key={`${i}-selectOption`} value={folder.name}>
                {folder.name}
              </option>
            ))}
          </select>
          <br></br>
          <span>content: </span>
          <input
            value={content}
            onChange={e => setContent(e.target.value)}
          ></input>
          <br></br>
          <button type='submit'>Submit</button>
        </form>
      ) : null}
    </>
  );
}
