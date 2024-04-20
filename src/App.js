// App.js
//            python manage.py runserver
import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import OptionPage from './optionPage'; 
import HomePage from './HomePage';  
import ViewTrades from './trades/viewTrades';
import Recap from './recap';


// NavBar Component
function NavBar() {
  return (
    <>
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex md:flex md:flex-grow space-x-2">
          <Link to="/" className="text-2xl font-bold">Greeks4Geeks</Link>
          <Link to="/option-page" className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 transition duration-300">Option Page</Link>       
          {/*<Link to="/trades/viewTrades" className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 transition duration-300">Options Log</Link> */}      
          <Link to="/recap" className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 transition duration-300">Recap</Link>       
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
          <Route path="/trades/viewTrades" element={<ViewTrades />} /> 
          <Route path="/recap" element={<Recap />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
