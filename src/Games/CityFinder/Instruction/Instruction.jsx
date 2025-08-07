import './Instruction.css';
import InstructionText from './InstructionText/InstructionText.jsx';
import Question from './Question/Question.jsx';
import NextButton from './NextButton/NextButton.jsx';
import TipButton from './TipButton/TipButton.jsx';
import { useState, useImperativeHandle, forwardRef, useRef } from 'react';

const Instruction = forwardRef(({ initialCity, map }, ref) => {
    const [currentCity, setCurrentCity] = useState(initialCity);
    const removeTipRef = useRef();

    useImperativeHandle(ref, () => ({
        updateCity: (newCity) => {
        setCurrentCity(newCity);
        if (removeTipRef.current) {
            removeTipRef.current.removeTip();
            console.log("Tip removed when city changed.");
        }   
        }
    }));

    return (
        <div id="instruction-box">
            <InstructionText />
            <Question currentCity={currentCity} />
            <NextButton />
            <TipButton ref={removeTipRef} currentCity={currentCity} map={map} />
        </div>
    );
});

export default Instruction