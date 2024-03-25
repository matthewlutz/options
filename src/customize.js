import React, {useState} from 'react';

function Customize({onCustomSubmit}){
    const [priceDelta, setPriceDelta] = useState(0.05);
    const [interestRate, setInterestRate] = useState(5.28);
    
    const handleSubmit = async (e) => {
           e.preventDefault();
           onCustomSubmit({priceDelta, interestRate});
    }

    const handleInterestChange = async (e) => {
        const interest = parseFloat(e.target.value);
        setInterestRate(interest);
    }

    const handleDeltaChange = async (e) => {
        const delta = parseFloat(e.target.value);
        setPriceDelta(delta); 
    } 

    return (
        <div className="mx-auto bg-gray-700 text-white p-5 rounded-xl shadow-md overflow-hidden">
            <h1 className="font-bold text-center mb-4">Customize Graph</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex justify-between items-center">
                    <div className="flex-1 mr-2 w-1/4">
                        <label htmlFor="priceDelta" className="block text-sm font-medium">
                            Price Delta
                        </label>
                        <input
                            type="number"
                            id="priceDelta"
                            value={priceDelta}
                            onChange={handleDeltaChange}
                            className="mt-1 block w-3/4 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md"
                            step="any"
                        />
                    </div>
                    <div className="flex-2 w-3/4">
                        <p className="italic text-sm text-wrap">
                            Enter the price delta as a decimal. Default is .05; 5% each way
                        </p>
                    </div>

                </div>
                <div className="mb-3 flex justify-between items-center">
                    <div className="flex-1 mr-2 w-1/4">
                        <label htmlFor="interestRate" className="block text-sm font-medium">
                            Interest Rate (%)
                        </label>
                        <input
                            type="number"
                            id="interestRate"
                            value={interestRate}
                            onChange={handleInterestChange}
                            className="mt-1 block w-3/4 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md"
                        />
                    </div>
                    <div className="flex-2 w-3/4">
                        <p className="italic text-sm">
                            Specify the annual interest rate for more accurate pricing. Default is 5.28
                        </p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                        Update Graph
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Customize;