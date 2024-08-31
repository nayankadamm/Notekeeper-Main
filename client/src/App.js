import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import Notestate from "./context/Notes/NoteState";

import Login from "./components/Login";
import SignUp from "./components/Signup";
function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element ={<Login/>}/>
              <Route exact path="/signup" element ={<SignUp/>}/>
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
