import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;






// import logo from './logo.svg';
// import './App.css';
// import React from 'react';
// import Main from './Pages/Main';
// import MealDetails from './Pages/MealDetails';  
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CategorySearch from './Pages/CategorySearch';
// function App() {

//   return (
//     <>
//     <Router>
//       <Routes>
//         <Route path="/" element={<Main/>} />
//         <Route path="/category/:category" element={<CategorySearch/>} />
//         <Route path="/meal/:id" element={<MealDetails/>} />
//       </Routes>
//     </Router>
//     </>
//   );
// }

// export default App;
