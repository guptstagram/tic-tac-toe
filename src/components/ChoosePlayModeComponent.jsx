import React from "react";
import { useHistory } from 'react-router-dom';

import "../styles/ChoosePlayModeComponent.css";

import crossIcon from "../assets/close.png";
import zeroIcon from "../assets/circumference.png";

const ChoosePlayModeComponent=(props)=>{

    const history = useHistory();

    const chooseMode=(mode)=>{
        props.playMode(mode);
        history.push("/choose-side");
    }
    return(
        <div className="choose-play-mode">
            <div className="icons-container">
                <img src={crossIcon} alt="crossIcon"/>
                <img src={zeroIcon} alt="zeroIcon"/>
            </div>
            <p>Choose your play mode</p>
            <button type="button" onClick={()=>chooseMode("ai")}>With AI</button>
            <button type="button" onClick={()=>chooseMode("friend")}>With a Friend</button>
        </div>
    )
}

export default ChoosePlayModeComponent;