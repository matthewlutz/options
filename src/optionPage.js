

import React, {useState, useEffect} from 'react';
import TickerInput from './TickerComponent';

function OptionPage() {
    const [optionsChain, setOptionsChain] = useState({ calls: [], puts: [] });
    const [ticker, setTicker] = useState('');


    const handleTickerSubmit = (submittedTicker) => {
        console.log('ticker submitted: ', submittedTicker);
        setTicker(submittedTicker);
    }

    return(
        <div className="bg-gray-900 text-white min-h-screen p-4">
        <TickerInput onTickerSubmit={handleTickerSubmit}/>
        <div className="text-center">
          {/* Ticker input component */}
        </div>
  
        {/* Greeks Selection and Model Display */}
        <div className="flex flex-col items-center my-4">
          {/* Greeks selection buttons */}
          <div className="flex justify-center my-2">
            {/* Buttons for Delta, Gamma, etc. */}
          </div>
          {/* 3D Model and Side Panels */}
          <div className="flex justify-between w-full">
            {/* Options Chain Display */}
            <div className="w-1/4">
              {/* Call/Put chain component */}
            </div>
            {/* 3D Model Display */}
            <div className="w-1/2">
              {/* 3D Model Visualization */}
            </div>
            {/* Live View Panel */}
            <div className="w-1/4">
              {/* Live data panel */}
            </div>
          </div>
          {/* Strike Selection Display */}
          <div className="my-2">
            {/* Strike selection component */}
          </div>
        </div>
      </div>
    );

}

export default OptionPage;