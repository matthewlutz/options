import React, { useState } from 'react';

function TickerInput({ onTickerSubmit }) {
    const [ticker, setTicker] = useState('');
    const [currentPrice, setCurrentPrice] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const response = await fetch(`http://localhost:8000/api/stock-price/${ticker}/`);
            const data = await response.json();
            const roundedPrice = data.closing_price.toFixed(2);
            setCurrentPrice(roundedPrice);
            onTickerSubmit(ticker, roundedPrice);
        }catch (error) {
            console.error('Error fetching current price:', error);
            setCurrentPrice('unavailable');
            
        }finally{
            setIsLoading(false);
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
                    className="shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                    type="text"
                    placeholder="AAPL, GOOG, MSFT..."
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())} // Convert to uppercase for consistency
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 mx-auto block text-white font-bold py-2 px-4 rounded w-1/2">
                    Submit
                </button>
            </form>
            {isLoading ? (
                <div className="text-white">Loading...</div> 
            ) : currentPrice ? (
                <div className="text-white font-bold">
                    Underlying Price: ${currentPrice}
                </div>
            ) : null}
        </div>
    );
}

export default TickerInput;