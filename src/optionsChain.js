//this is the options chain component

import React, { useState, useEffect} from 'react';

function OptionsChain({ ticker, setSelectedOption, currentPrice}) {
    const [optionsChain, setOptionsChain] = useState({});
    const [selectedDate, setSelectedDate] = useState('');
    //const [selectedOption, setSelectedOption] = useState(null);


    useEffect(() => {
        if(ticker){
            fetchOptionChain(ticker)
        }
    },[ticker]);

    const handleOptionClick = (call, put) => {
      const optionType = call ? 'call' : 'put'
      const optionData = optionType === 'call' ? call : put;
      // debugging purposes console.log("Updating selectedOption with:", optionData);
      setSelectedOption({
        ...optionData,
        optionType: optionType,
        expirationDate: selectedDate,
        underlyingPrice: currentPrice
      })
    }
    

    const fetchOptionChain = async (ticker) => {
        try{
            const response = await fetch(`http://localhost:8000/api/options-chain/${ticker}/`);
            const data = await response.json();
            //console.log('options chain data:', data);
            setOptionsChain(data);
            if (data && Object.keys(data).length > 0) {
                //auto-select the closest expiration date
                setSelectedDate(Object.keys(data)[0]);
            }
        }catch (error) {
            console.error('Error fetching options chain:', error);
            setOptionsChain(null);
        }
    };

    return (
        <div className="mt-4 mx-auto max-w-4xl">
          <h2 className="text-xl font-semibold text-center mb-4 text-white">Option Chain for {ticker}</h2>
          <div className="mb-6">
            <label htmlFor="expiration-date" className="block text-sm font-bold mb-2 text-white">Select Expiration Date: </label>
            <select
              id="expiration-date"
              className="block appearance-none w-full bg-gray-800 border border-gray-600 text-white px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">--Please choose an expiration date--</option>
              {Object.keys(optionsChain || {}).map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
          {selectedDate && optionsChain[selectedDate] ? (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Expiration Date: {selectedDate}</h3>
              <div className="mb-8">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-4 py-2">Call Price</th>
                      <th className="px-4 py-2">Strikes</th>
                      <th className="px-4 py-2">Put Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 text-white">
                    {optionsChain[selectedDate].calls.map((call, index) => {
                        const put = optionsChain[selectedDate].puts[index];
                        return (
                            <tr key={index} className="border-b border-gray-700" onClick={() => handleOptionClick(call, put)}>
                                <td className="px-4 py-2">{`$${call.lastPrice.toFixed(2)}`}</td>
                                <td className="px-4 py-2 text-center">{call.strike}</td>
                                <td className="px-4 py-2">{put ? `$${put.lastPrice.toFixed(2)}` : 'N/A'}</td>
                            </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center mt-4 text-white">No option chain data available for {ticker} or selected date.</p>
          )}
        </div>
      );
}

export default OptionsChain;