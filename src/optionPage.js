

import React, {useState, useEffect, useRef} from 'react';
import TickerInput from './TickerComponent';
import OptionsChain from './optionsChain';
import GreekModel from './greekModel';
import GreekSelector from './greekSelector';
import Stats from './optionsStats';
import SelectedOption from './selectedOption';
import Customize from './customize';
import './index.css';

function OptionPage() {
    //const [optionsChain, setOptionsChain] = useState({ calls: [], puts: [] });
    const [ticker, setTicker] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [selectedCustoms, setCustoms] = useState('');
    const [selectedGreek, setCurrentGreek] = useState('delta');
    const modelRef = useRef(null);

    useEffect(() => {
        if(selectedOption && modelRef.current){
            modelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedOption])


    const handleTickerSubmit = (submittedTicker, price) => {
        console.log('ticker submitted: ', submittedTicker);
        setTicker(submittedTicker);
        setCurrentPrice(price);
    }

    const handleGreekSelect = (submittedGreek) => {
        setCurrentGreek(submittedGreek);
    }

    const handleCustomSubmit = (submittedCustom) => {
        setCustoms(submittedCustom);
    }

    return(
        <div className="bg-gray-900 text-white min-h-screen p-4">
            <div className="flex">
                <div className="w-1/6 ml-6 mr-4">
                    <OptionsChain 
                        ticker={ticker} 
                        setSelectedOption={setSelectedOption} 
                        currentPrice={currentPrice}
                    />
                </div>
                <div className="ml-4 mr-4 w-1/2">
                    <div className="ml-5">
                        <TickerInput onTickerSubmit={handleTickerSubmit} />
                        <SelectedOption selectedOption={selectedOption} />
                        <GreekSelector onGreekSelect={handleGreekSelect}/>
                        <GreekModel selectedOption={selectedOption} selectedGreek={selectedGreek} selectedCustoms={selectedCustoms} />  
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="w-1/2 mb-4">
                        <Stats 
                            selectedOption={selectedOption} selectedCustoms={selectedCustoms}
                        />
                    </div>                  
                    <div className="mt-8">
                        <Customize onCustomSubmit={handleCustomSubmit}/>
                    </div>
                </div>                                            
            </div>                          
        </div>  
    );
}

export default OptionPage;