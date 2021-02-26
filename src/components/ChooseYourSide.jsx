import React from "react";
import { useHistory } from 'react-router-dom';

import "../styles/ChooseYourSide.css";

import crossIcon from "../assets/close.png";
import zeroIcon from "../assets/circumference.png";

const ChooseYourSide = (props) => {

    const history = useHistory();

    const [side,setSide]=React.useState("x");

    const selectSide=(side)=>{
        setSide(side);
    }

    const continueClicked=()=>{
        props.playSide(side);
        history.push("/play");
    }

    return (
        <div className="choose-side">
            <p>Pick your Side</p>
            <div className="icons-container">
                <img src={crossIcon} alt="crossIcon" className={side==="x"?"selected":"not-selected"} onClick={()=>selectSide("x")}/>
                <img src={zeroIcon} alt="zeroIcon" className={side==="o"?"selected":"not-selected"} onClick={()=>selectSide("o")}/>
            </div>
            <button type="button" onClick={continueClicked}>Continue</button>
        </div>
    )
}

export default ChooseYourSide;