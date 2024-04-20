import React, {useState, useEffect } from 'react';
import Modal from 'react-modal';



function Stats({selectedOption, selectedCustoms}){
    const [greeks, setGreeks] = useState({
        delta: '0',
        gamma: '0',
        theta: '0',
        vega: '0',
        rho: '0'
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedGreek, setSelectedGreek] = useState('');

    const greekDescriptions = {
        delta: "Delta measures the rate of change of the option price with respect to changes in the underlying asset's price.",
        gamma: "Gamma measures the rate of change in delta over time as the underlying asset price changes.",
        theta: "Theta measures the rate of change in the option price with respect to the passage of time.",
        vega: "Vega measures sensitivity to volatility. Vega indicates the amount an option’s price changes given a 1% change in implied volatility.",
        rho: "Rho measures the sensitivity of an option to a change in interest rate."
    };
    
    useEffect(() => {
        const fetchGreeks = async () => {
            try{
                const params = new URLSearchParams({
                        optionType: selectedOption.optionType,
                        underlyingPrice: selectedOption.underlyingPrice,
                        strike: selectedOption.strike,
                        expirationDate: selectedOption.expirationDate,
                        interestRate: selectedCustoms.interestRate,
                        impliedVolatility: selectedOption.impliedVolatility,
                });
    
                const response = await fetch(`http://localhost:8000/api/get-current-greeks/?${params.toString()}`, {
                    method: 'GET', 
                    headers: { 'Accept': 'application/json' },
                });
                const data = await response.json();
                console.log('data: ', data);
                setGreeks(data);
            }
            catch (error){
                console.log('error fetching all greeks: ', error);
            }
        }
         

        fetchGreeks();
    }, [selectedOption, selectedCustoms]);

    const openModal = (greek) => {
        setSelectedGreek(greek);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            background: 'none',
            padding: 0,
            overflow: 'none',
            width: 'auto',
            maxWidth: '90vw'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
    };

    Modal.setAppElement('#root');
    
    return (
        <div className="mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
                <h1 className="text-lg font-bold text-white">Option Greeks</h1>
                <div className="mt-4 text-white">
                    {Object.entries(greeks).map(([key, value]) => (
                        <p key={key} className="mb-2">
                            <button onClick={() => openModal(key)} className="font-medium text-blue-300 hover:text-blue-500 hover:underline">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </button>:
                            {parseFloat(value).toFixed(3)}
                        </p>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Greek Explanation"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <h2 className="text-xl font-bold mb-4">{selectedGreek.charAt(0).toUpperCase() + selectedGreek.slice(1)}</h2>
                    <p>{greekDescriptions[selectedGreek]}</p>
                    <button onClick={closeModal} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Close
                    </button>
                </div>
            </Modal>
        </div>          
    );
}

export default Stats;