import React from "react";
import Home from "./Home";
import Movie from "./Movie";
import Error from "./Error";
import Search from "./Search";
import {Routes, Route } from 'react-router-dom';
import "./App.css";
const App =()=>{
  return <>
 
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="movie/:id" element={<Movie/>}></Route>
    <Route path="*" element={<Error/>}></Route>
  </Routes>
  </>
};

export default App;