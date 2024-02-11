// App.js
import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import OptionPage from './optionPage'; 
import HomePage from './HomePage';  

// NavBar Component
function NavBar() {
  return (
    <>
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/option-page" className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 transition duration-300">Option Page</Link>
         
        </div>
      </div>
    </nav>
    </>
  );
}

// App Component
function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/option-page" element={<OptionPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
