import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import dummyStore from './dummy-store.js';
import { Switch, Route, Link } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Notes from './Components/Notes';
// import PropTypes from 'prop-types';

// const html =

function App() {
  // Store State
  const [store, setStore] = useState({ folders: [], notes: [] });
  const [storeChange, setStoreChange] = useState(0);

  // Handles deletion of notes
  async function deleteNote(note) {
    await fetch(`http://localhost:9090/notes/${note.id}/`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    });
    setStoreChange(storeChange => storeChange + 1);
  }

  // Grabs data from server.
  useEffect(() => {
    async function fetchData() {
      // Start API Calls asynchronously
      const folderFetch = fetch(`http://localhost:9090/folders/`);
      const notesFetch = fetch('http://localhost:9090/notes/');

      // Get Results
      const folderResult = await folderFetch;
      const notesResult = await notesFetch;

      // Convert to json
      const folders = await folderResult.json();
      const notes = await notesResult.json();

      // Save to Store
      setStore(store => ({ ...store, folders, notes }));
      // setStore(store => ({ ...store, notes }));
      // console.log("grabbedData");
    }

    fetchData();
    // console.log("grabbingData");
  }, [storeChange]);

  return (
    <div className='App'>
      <Switch>
        {['/', '/folder/:folderId', '/note/:noteId'].map(path => (
          <Route
            key={path}
            exact
            path={path}
            render={routeProps => (
              <>
                <Header>
                  <Link to='/'>Noteful</Link>
                </Header>
                <Container>
                  <SidebarContainer>
                    <Sidebar
                      store={store}
                      setStoreChange={setStoreChange}
                      {...routeProps}
                    />
                  </SidebarContainer>
                  <NotesContainer>
                    <Notes
                      store={store}
                      deleteNote={deleteNote}
                      setStoreChange={setStoreChange}
                      {...routeProps}
                    />
                  </NotesContainer>
                </Container>
              </>
            )}
          />
        ))}
        <Route path='/' render={() => <div>404</div>}></Route>
      </Switch>
    </div>
  );
}

export default App;

// const SuperContainer = styled.div`
//   width: 80vh;
// `;

const Header = styled.div`
  display: flex;
  justify-content: center;

  font-size: 2em;
  padding: 5px;
  background-color: #eff0f1;
`;

const Container = styled.div`
  display: flex;
  padding: 5px;
  // width: 80vh;
`;

const SidebarContainer = styled.div`
  flex-direction: column;
  min-width: 300px;
  padding: 5px;
  // flex-grow: 1;
`;

const NotesContainer = styled.div`
  flex-direction: column;
  flex-grow: 4;
`;
