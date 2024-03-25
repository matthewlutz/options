import React from 'react';

function GreekSelector({onGreekSelect}){

    return(
        <div className="text-black my-4 flex justify-center ">
            <button onClick={() => onGreekSelect('delta')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 mx-2">Delta</button>
            <button onClick={() => onGreekSelect('gamma')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 mx-2">Gamma</button>
            <button onClick={() => onGreekSelect('theta')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 mx-2">Theta</button>
            <button onClick={() => onGreekSelect('vega')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 mx-2">Vega</button>
            <button onClick={() => onGreekSelect('rho')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 mx-2">Rho</button>
        </div>
    );
}


export default GreekSelector;