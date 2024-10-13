import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <>

      <Router>
      <NoteState>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />}/>
        </Routes>








        </NoteState>
      </Router>
      
    </>
  );
}

export default App;
