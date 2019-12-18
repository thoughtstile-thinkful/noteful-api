import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddNote from './AddNote';
import styled from 'styled-components';

export default function Notes(props) {
  let mode = props.match.path.split('/')[1];
  // let store = props.store;
  let folderId = props.match.params.folderId;

  const [store, setStore] = useState(props.store);
  useEffect(() => {
    setStore(props.store);
    // console.log("PROPS UPDATED");
  }, [props]);

  // console.log(store);
  if (store === undefined) {
    return null;
  }

  let notesCopy = [...store.notes];

  let notes = !mode
    ? notesCopy
    : notesCopy.filter(note => note.folderId === folderId);

  if (mode !== 'note') {
    return (
      <>
        {notes.map((note, i) => (
          <Note key={`${i}-note`}>
            <ModifiedBox>
              <Link to={`/note/${note.id}`}>
                {note.name} -{' '}
                {store.folders.find(folder => folder.id === note.folderId).name}
              </Link>
              <p>{`Date modified on ${note.modified.split('T')[0]}`}</p>
            </ModifiedBox>
            <button onClick={() => props.deleteNote(note)}>delete note</button>
          </Note>
        ))}
        <AddNote store={store} setStoreChange={props.setStoreChange}></AddNote>
      </>
    );
  } else if (mode === 'note') {
    let noteId = props.match.params.noteId;
    let note = store.notes.find(_note => _note.id === noteId);

    if (note) {
      return (
        <>
          <Note>
            {note.name} -{' '}
            {store.folders.find(folder => folder.id === note.folderId).name}
          </Note>
          <Content>{note.content}</Content>
        </>
      );
    } else {
      return null;
    }
  }
}

const Note = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px;

  // width: 50%;

  margin-top: 10px;

  border: 1px solid grey;
`;

const ModifiedBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 5px;
`;
