//homepage for the app

import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return(
        <div className="min-h-screen bg-gray-900 flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Greeks4Geeks
                </h1>
                <div className="mb-4">
                  <button
                    onClick={() => navigate('/option-page')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Explore Options
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => navigate('/trades/viewTrades')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                  Options Log
                  </button>
              </div>
      </div>
    </div>
    );
}

export default HomePage;