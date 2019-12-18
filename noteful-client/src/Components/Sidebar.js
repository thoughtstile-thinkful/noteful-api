import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddFolder from './AddFolder';
import styled from 'styled-components';

export default function Sidebar(props) {
  let mode = props.match.path.split('/')[1];
  // let store = props.store;
  const [store, setStore] = useState({ folders: [], notes: [] });
  const [match, setMatch] = useState(props.match);

  useEffect(() => {
    setStore(props.store);
    setMatch(props.match);
  }, [props]);

  // Error handling
  if (store.folders.length > 0 && store.notes.length > 0) {
    let folderId = match.params.folderId;

    if (mode !== 'note') {
      return (
        <React.Fragment>
          {store.folders.map((folder, i) => (
            <Folder key={`${i}-folder`}>
              <Link to={`/folder/${folder.id}`}>
                {folderId === folder.id ? '->' : ''} Folder {folder.name}
              </Link>
            </Folder>
          ))}
          <AddFolder setStoreChange={props.setStoreChange}></AddFolder>
        </React.Fragment>
      );
    } else if (mode === 'note') {
      let { noteId = '' } = props.match.params;
      let folderId = store.notes.find(note => note.id === noteId).folderId;
      let folder = store.folders.find(folder => folder.id === folderId);
      return (
        <>
          <Folder>
            <Link to='/'>Go back</Link>
          </Folder>
          <Folder>Folder {folder.name}</Folder>
        </>
      );
    }
  } else {
    return null;
  }
}

// const FolderContainer = styled.div`
//   padding:
// `;

export const Folder = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;

  width: 90%;

  margin-top: 10px;

  border: 1px solid grey;
`;
