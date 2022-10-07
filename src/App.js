import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Header from './components/Header';
import NoteListPage from './page/NoteListPage';
import NotePage from './page/NotePage';


function App() {

  const [isDark, setIsDark] = useState(false)

  const appElements = (
    <div >
      <NoteListPage isDark={isDark} />
    </div>
  )

  return (
    <Router>
      <div className={isDark ? "container dark" : "container root"}>
        <div className="app">
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Routes >
            <Route path="/" element={appElements} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
