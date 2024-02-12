import React, { useState } from 'react';

function TickerInput({ onTickerSubmit }) {
    const [ticker, setTicker] = useState('');
    const [currentPrice, setCurrentPrice] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        onTickerSubmit(ticker); // Pass the ticker value up to the parent component

        try{
            const response = await fetch(`http://localhost:8000/api/stock-price/${ticker}/`);
            const data = await response.json();
            const roundedPrice = data.closing_price.toFixed(2);
            setCurrentPrice(roundedPrice);
        }catch (error) {
            console.error('Error fetching current price:', error);
            setCurrentPrice('unavailable');
            
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <label htmlFor="tickerInput" className="block text-white text-sm font-bold mb-2">
                    Enter ticker here:
                </label>
                <input
                    id="tickerInput"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                    type="text"
                    placeholder="AAPL, GOOG, MSFT..."
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())} // Convert to uppercase for consistency
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2">
                    Submit
                </button>
            </form>
            {currentPrice && (
                <div className="text-white">
                    Current Price: ${currentPrice}
                </div>
            )}
        </div>
    );
}

export default TickerInput;