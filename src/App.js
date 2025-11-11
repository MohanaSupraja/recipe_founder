import logo from './logo.svg';
import './App.css';
import React from 'react';
import Main from './Pages/Main';
import MealDetails from './Pages/MealDetails';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategorySearch from './Pages/CategorySearch';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/category/:category" element={<CategorySearch/>} />
        <Route path="/meal/:id" element={<MealDetails/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
