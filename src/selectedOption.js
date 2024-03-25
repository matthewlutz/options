import React, {useState, useEffect} from 'react';

function SelectedOption({selectedOption}){


    return(
        <div className="flex justify-center font-bold">
            {selectedOption && (
                <ul>
                    <li>Type: {selectedOption.optionType.toUpperCase()}</li>
                    <li>Strike: ${selectedOption.strike}</li>
                    <li>Exp. Date: {selectedOption.expirationDate}</li>               
                </ul>
            )}      
        </div>

        
    );

}

export default SelectedOption;