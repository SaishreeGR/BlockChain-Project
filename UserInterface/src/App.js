import React from "react";
import Navbar from "./components/navbar";
import { Route,Routes } from "react-router-dom";
import {Home} from "./components/Home";
import {Upload} from "./components/Upload";
import {Display} from "./components/Display";
import {Privilege} from "./components/Privilege";
import {About} from "./components/About";

function App() {
  return(
   
    <>
    
      <Navbar/>
    
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/upload" element={<Upload/>}/>
      <Route path="/display" element={<Display/>}/>
      <Route path="/privilege" element={<Privilege/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>

    
    </>
  );
}

export default App;