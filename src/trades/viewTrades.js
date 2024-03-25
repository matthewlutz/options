import React, { useState } from 'react';

function TradeModal({isOpen, onClose, onConfirm}){
    const [trade, setTrade] = useState({
        ticker: '',
        position: '',
        strike: '',
        entry: '',
        exit: '',
        notes: '',
        quantity: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrade(prevTrade => ({
            ...prevTrade,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const tradeData = {
            ticker: trade.ticker,
            postiton: trade.position,
            strike: trade.strike,
            entry: trade.entry,
            exit: trade.exit,
            quantity: trade.quantity,
            notes: trade.notes,
        }
        try{
            fetch('https://localhost:8000/api/add-trade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tradeData),
            })
           
        }catch (error){
            console.log("error sending trade data to backend: ", error);
        }
        onClose();
    }

    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Log New Trade</h3>
                        <div className="mt-2 px-7 py-3">
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text" 
                                    name="ticker" 
                                    value={trade.ticker} 
                                    onChange={handleChange}
                                    placeholder="Ticker" 
                                    className="mb-3 px-3 py-2 border rounded" 
                                />
                                <input 
                                    type="number" 
                                    name="strike" 
                                    value={trade.strike} 
                                    onChange={handleChange}
                                    placeholder="Strike" 
                                    className="mb-3 px-3 py-2 border rounded" 
                                />
                                <input 
                                    type="test" 
                                    name="position" 
                                    value={trade.position} 
                                    onChange={handleChange}
                                    placeholder="Position" 
                                    className="mb-3 px-3 py-2 border rounded" 
                                />
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    value={trade.quantity} 
                                    onChange={handleChange}
                                    placeholder="Quantity" 
                                    className="mb-3 px-3 py-2 border rounded" 
                                />
                                <input 
                                    type="number" 
                                    name="entryPrice" 
                                    value={trade.entryPrice} 
                                    onChange={handleChange}
                                    placeholder="Entry Price" 
                                    className="mb-3 px-3 py-2 border rounded" 
                                />
                                <input 
                                    type="number" 
                                    name="exitPrice" 
                                    value={trade.exitPrice} 
                                    onChange={handleChange}
                                    placeholder="Exit Price" 
                                    className="mb-3 px-3 py-2 border rounded" 
                                />
                                <textarea 
                                    name="notes" 
                                    value={trade.notes} 
                                    onChange={handleChange}
                                    placeholder="Notes" 
                                    className="mb-3 px-3 py-2 border rounded" 
                                />
                                <div className="items-center px-4 py-3">
                                    <button 
                                        onClick={onClose} 
                                        className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-20 shadow-sm hover:bg-gray-700"
                                    >
                                    Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-20 shadow-sm hover:bg-blue-700 float-right"
                                    >
                                    Save
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
        </div>
    </div>
  );
}

function ViewTrades(){
    const [isModalOpen, setModalOpen] = useState(false);
    const [trades, setTrades] = useState([]);

    const handleOpenModal = () => setModalOpen(true); 
    const handleCloseModal = () => setModalOpen(false); 
    const handleSaveTrades = (newTrade) => {
        setTrades([...trades, newTrade]);
        handleCloseModal();
    }

    return (
        <div className="bg-gray-900 pt-8 pb-4 px-4 w-full">

            {/*Totals*/}
            <div className="flex justify-between items-center w-full bg-gray-900 p-4 space-x-4 rounded-lg mb-6">
                <div className="text-center bg-opacity-25 bg-white rounded-lg p-2 flex-1">
                    <h2 className="text-sm font-medium text-white">Total P/L</h2>
                    <p className="text-lg text-white">$0.00</p>
                </div>
                <div className="text-center bg-opacity-25 bg-white rounded-lg p-2 flex-1">
                    <h2 className="text-sm font-medium text-white">Win Ratio</h2>
                    <p className="text-lg text-white">0%</p>
                </div>
                <div className="text-center bg-opacity-25 bg-white rounded-lg p-2 flex-1">
                    <h2 className="text-sm font-medium text-white">Average Winner</h2>
                    <p className="text-lg text-green-400">$0.00</p>
                </div>
                <div className="text-center bg-opacity-25 bg-white rounded-lg p-2 flex-1">
                    <h2 className="text-sm font-medium text-white">Average Loser</h2>
                    <p className="text-lg text-red-500">-$0.00</p>
                </div>
                <div className="text-center bg-opacity-25 bg-white rounded-lg p-2 flex-1">
                    <h2 className="text-sm font-medium text-white">Average Long</h2>
                    <p className="text-lg text-white">$0.00</p>
                </div>
                <div className="text-center bg-opacity-25 bg-white rounded-lg p-2 flex-1">
                    <h2 className="text-sm font-medium text-white">Average Short</h2>
                    <p className="text-lg text-white">$0.00</p>
                </div>
            </div>
        
            <div className="flex justify-center px-4">
                <button
                    onClick={handleOpenModal}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-opacity-50 active:bg-blue-800"
                >
                Add Trade
                </button>
                <TradeModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleSaveTrades}
                />
            </div>
            

            {/* Trade Table */}
            <div className="py-4 fixed inset-0 z-10 overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-white uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">ID</th>
                            <th scope="col" className="py-3 px-6">Enter</th>
                            <th scope="col" className="py-3 px-6">Exit</th>
                            <th scope="col" className="py-3 px-6">Action</th>
                            <th scope="col" className="py-3 px-6">Ticker</th>
                            <th scope="col" className="py-3 px-6">Contracts</th>
                            <th scope="col" className="py-3 px-6">Entry Price</th>
                            <th scope="col" className="py-3 px-6">Exit Price</th>
                            <th scope="col" className="py-3 px-6">Profit / Loss</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default ViewTrades;