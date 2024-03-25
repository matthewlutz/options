import React, {useState, useEffect } from 'react';


function Stats({selectedOption, selectedCustoms}){
    const [greeks, setGreeks] = useState({
        delta: '0',
        gamma: '0',
        theta: '0',
        vega: '0',
        rho: '0'
    });
    
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
    }, [selectedOption]);
    
    return (
        <div className="mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
                <h1 className="block mt-1 text-lg leading-tight font-bold text-white">Option Greeks</h1>
                <div className="mt-4 text-white">
                    <p className="mb-2 "><span className="font-medium">Delta:</span> {parseFloat(greeks.delta).toFixed(3)}</p>
                    <p className="mb-2 "><span className="font-medium">Gamma:</span> {parseFloat(greeks.gamma).toFixed(3)}</p>
                    <p className="mb-2 "><span className="font-medium">Theta:</span> {parseFloat(greeks.theta).toFixed(3)}</p>
                    <p className="mb-2 "><span className="font-medium">Vega:</span> {parseFloat(greeks.vega).toFixed(3)}</p>
                    <p className="mb-2"><span className="font-medium">Rho:</span> {parseFloat(greeks.rho).toFixed(3)}</p>
                </div>
            </div>
        </div>            
    );
}

export default Stats;