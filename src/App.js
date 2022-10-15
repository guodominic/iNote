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
import Home from "./page/Home";
import TodoPage from "./page/TodoPage";


function App() {

  const [isDark, setIsDark] = useState(true)

  const notesPage = (
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
            <Route path="/iNote" element={<Home />} />
            <Route path="/iNote/todolist" element={<TodoPage />} />
            <Route path="/iNote/notes" element={notesPage} />
            <Route path="/iNote/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );

  /*  return (
     <Router>
       <div >
         {(notes.length > 0)
           ?
           <div className={isDark ? "container dark" : "container root"} >
             <div className="app">
               <Header isDark={isDark} setIsDark={setIsDark} />
               <Routes >
                 <Route path="/home" element={<Home />} />
                 <Route path="/iNote" element={appElements} />
                 <Route path="/note/:id" element={<NotePage />} />
               </Routes>
             </div>
           </div>
           :
           <Routes >
             <Route path="/home" element={<Home />} />
           </Routes>
         }
       </div>
     </Router>
   ); */
}

export default App;
