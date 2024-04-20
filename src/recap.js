import React, {useEffect, useState, useRef, useMemo} from 'react';
import logoImage from './monetaryLogo.png';


function Recap() {
  const ref = useRef(null);
  //const [width, setWidth] = useState('max-w-md')
  const trades = useMemo(() => [
    { id: 2, ticker: 'SPY', strike: 497, type: 'p', expDate: '2024-04-19', entry: .84, exit: 2.96 },
    { id: 3, ticker: 'SMCI', strike: 805, type: 'p', expDate: '2024-04-19', entry: 7.20, exit: 91.20 },
    { id: 4, ticker: 'LMT', strike: 462.5, type: 'c', expDate: '2024-04-19', entry: 1.25, exit: .95 },
    { id: 4, ticker: 'CGC', strike: 8, type: 'c', expDate: '2024-04-19', entry: .22, exit: .16},
    { id: 4, ticker: 'NFLX', strike: 617.5, type: 'c', expDate: '2024-04-19', entry: 21.05, exit: .01},
  
  ], []);

  const currentDate = 'April 19, 2024';

  // Calculate average profit percentage
  const averageProfitPercentage = trades.reduce((total, trade) => {
    const profitPercentage = ((trade.exit - trade.entry) / trade.entry) * 100;
    return total + profitPercentage;
  }, 0) / trades.length;

  return (
    <div className="bg-gray-900 flex justify-center min-h-screen pt-16 pb-8"> {/* Padding at the top for navbar */}
      <div className="w-1/3 max-w-screen-lg min-h-screen mx-auto"> {/* This container centers your Recap component */}
        <div className="aspect-ratio-box-wrapper relative" style={{ width: '100%', paddingTop: '56.25%' }}>
          {/* Content Container */}
          <div className="content-container absolute top-0 left-0 right-0 bottom-0 bg-gray-900 text-white rounded-lg ">
            {/* Content */}
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h1 className="text-xl font-bold">Recap for {currentDate}</h1>
                <img src={logoImage} alt="Your Logo" className="h-16" />
              </div>
              <div className="flex flex-wrap -mx-2 overflow-x-auto">
                {trades.map((trade) => {
                  const profit = trade.exit - trade.entry;
                  const profitPercentage = (profit / trade.entry) * 100;
                  return (
                    <div key={trade.id} className="px-2 w-1/2">
                      <div className="mb-3 bg-gray-800 p-3 rounded-lg shadow-md">
                        <p className="text-md font-bold  mb-1">
                          ${trade.ticker} ${trade.strike}
                          {trade.type === 'c' ? ' Call ' : ' Put '} 
                        </p>
                        <p className="text-md font-bold  mb-1">({trade.expDate})</p>
                        <p className="text-sm text-gray-400 mb-2">
                          ${trade.entry.toFixed(2)} --&gt; ${trade.exit.toFixed(2)}
                        </p>
                        <p className={`text-sm font-bold ${profitPercentage >= 1000 ? 'font-extrabold text-blue-500' : profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {profitPercentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-gray-800 p-3 rounded-lg shadow-md mt-4">
                <p className="text-md text-gray-400 mb-2">Total Average Profit</p>
                <p className={`text-lg font-bold ${averageProfitPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {averageProfitPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Recap;