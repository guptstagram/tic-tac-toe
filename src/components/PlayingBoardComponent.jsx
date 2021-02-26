import React from "react";
import { Link } from "react-router-dom";

import crossIcon from "../assets/close.png";
import zeroIcon from "../assets/circumference.png";

import "../styles/PlayingBoardComponent.css";

const PlayingBoardComponent = (props) => {
    const [turn, setTurn] = React.useState(props.selectedSettings.side);
    const [vals, setVals] = React.useState(new Array(3).fill("").map(() => new Array(3).fill("")));
    const [score, setScore] = React.useState({
        you: 0,
        opponent: 0,
    })

    const rows=[0,1,2];

    const countEmpty = () => {
        let empty = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (vals[i][j] === "") empty++;
            }
        }
        return empty;
    }

    const boardBoxClicked = (x, y) => {
        let newarr = [...vals];
        newarr[x][y] = turn;
        if (props.selectedSettings.mode === "ai") {
            setVals(newarr);
            let aix = Math.floor((Math.random() * 3));
            let aiy = Math.floor((Math.random() * 3));
            while (newarr[aix][aiy] !== "") {
                aix = Math.floor((Math.random() * 3));
                aiy = Math.floor((Math.random() * 3));
                if (countEmpty() <= 1 || checkResult() !== "play") break;
            }
            if (countEmpty !== 0 && checkResult() === "play") newarr[aix][aiy] = turn === "x" ? "o" : "x";
        }
        else {
            setTurn(turn === "x" ? "o" : "x");
        }
        setVals(newarr);
    }

    const checkResult = () => {
        for (let i = 0; i < 3; i++) {
            let check = vals[i][0];
            for (let j = 0; j < 3; j++) {
                // console.log(`${i},${j} ${check} - ${vals[i][j]}`)
                if (vals[i][j] !== check || check === "") break;
                else if (j === 2) return `${check.toUpperCase()} won the game.`;
            }
        }
        for (let i = 0; i < 3; i++) {
            let check = vals[0][i];
            for (let j = 0; j < 3; j++) {
                // console.log(`${i},${j} ${check} - ${vals[i][j]}`)
                if (vals[j][i] !== check || check === "") break;
                else if (j === 2) return `${check.toUpperCase()} won the game.`;
            }
        }
        for (let i = 0; i < 3; i++) {
            let check = vals[0][0];
            // console.log(`${i},${i} ** ${check} - ${vals[i][i]}`)
            if (vals[i][i] !== check || check === "") break;
            else if (i === 2) return `${check.toUpperCase()} won the game.`;
        }
        for (let i = 2; i >= 0; i--) {
            let check = vals[2][0];
            if (vals[i][2 - i] !== check || check === "") break;
            else if (i === 0) return `${check.toUpperCase()} won the game.`;
        }
        if(countEmpty()===0) return "Game Drawn";
        return "play";
    }

    const resetBoard = (res) => {
        if(res.toLowerCase()==="x" || res.toLowerCase()==="o"){
            setScore(res.toLowerCase()===props.selectedSettings.side?{...score,you:score.you+1}:{...score,opponent:score.opponent+1})
        }
        setTurn(props.selectedSettings.side);
        setVals(new Array(3).fill("").map(() => new Array(3).fill("")));
    }

    return (

        <div className="playing-board">
            {props.selectedSettings.mode===""||props.selectedSettings.side===""?(
                <>
                    <p>Oops...something went wrong.</p>
                    <Link to="/"><button>Restart</button></Link>
                </>
            ):(
                <>
                    <div className="score-card">
                        <p>You</p>
                        <div className="score">
                            {score.you} - {score.opponent}
                        </div>
                        <p>{props.selectedSettings.mode.toUpperCase()}</p>
                    </div>
                    <div className="board">
                        {
                            rows.map(i=><div className="board-row" key={i}>
                                {
                                    rows.map(j=><div key={`${i}${j}`} className={`board-box ${vals[i][j] === "" ? null : "disable-box"} ${checkResult() !== "play" ? "disable-box" : null}`} onClick={() => boardBoxClicked(i, j)}>
                                            {vals[i][j] ? <img src={vals[i][j] === "x" ? crossIcon : zeroIcon} alt="tictactoe" /> : null}
                                        </div>
                                    )
                                }
                            </div>)
                        }
                    </div>
                    {checkResult() !== "play" ? <div className="score-update">
                        <p>{checkResult()}</p>
                        <button onClick={()=>resetBoard(checkResult()[0])}>Restart</button>
                    </div> : null}
                </>
            )}  
        </div>
    )
}

export default PlayingBoardComponent;