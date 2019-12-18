import React, { useState } from 'react';
// import useForm from '../Hooks/useForm';

const getUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // eslint-disable-next-line
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function AddFolder(props) {
  const [name, setName] = useState('');
  const [addFolderClicked, setAddFolderClicked] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    async function addFolder(newFolder) {
      await fetch(`http://localhost:9090/folders`, {
        method: 'POST',
        body: JSON.stringify(newFolder),
        headers: {
          'content-type': 'application/json'
        }
      });
      console.log(`sent ${newFolder.name}`);
      props.setStoreChange(storeChange => storeChange + 1);
    }

    let newFolder = {
      name: name,
      id: getUuid()
    };

    if (validateNewFolder(newFolder)) {
      addFolder(newFolder);
    }
  };

  function validateNewFolder(folder) {
    // Testing the name.
    let nameValidation = stringValidator(folder.name, 'NAME');

    return nameValidation;

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
      <button onClick={() => setAddFolderClicked(true)}>Add Folder:</button>
      {addFolderClicked ? (
        <form onSubmit={handleSubmit}>
          <input
            name='name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      ) : null}
    </>
  );
}
