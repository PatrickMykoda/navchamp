import { setTip, removeElement } from "../../utils/gameLogic";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import './TipButton.css';

const TipButton = forwardRef(({ currentCity, map }, ref) => {
    const currentTipRef = useRef(null);
    const [tipText, setTipText] = useState("Get tip");
    const [hide, setHide] = useState(""); // ✅ Use useState, not useRef!

    const getTip = () => {
        if (!currentTipRef.current) {
            currentTipRef.current = setTip(2, 225000, 7, currentCity, map);
            setTipText("Get even hotter tip");
            console.log("Tip button clicked for the first time.");
        } else {
            currentTipRef.current.setMap(null); // ✅ Add null parameter
            currentTipRef.current = setTip(0.5, 65000, 9, currentCity, map);
            setHide("hide"); // ✅ This triggers re-render!
            console.log("hide state activated");
        }
    }

    useImperativeHandle(ref, () => ({
        removeTip: () => {
            removeElement(currentTipRef.current);
            currentTipRef.current = null;
            setTipText("Get tip");
            setHide(""); // ✅ Reset hide state
        }
    }));

    return (
        <button 
            id="tip-button" 
            className={`tip-button ${hide}`} 
            onClick={getTip}
            //style={{ display: hide === "hide" ? "none" : "block" }} // Temporary test
        >
            {tipText}
        </button>
    );
});

export default TipButton;