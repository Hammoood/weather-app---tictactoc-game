import React, { useEffect, useRef, useState } from "react";
import './TicTacToc.css';
import circle from '../Assets/circle.png';
import close from '../Assets/close.png';

const TicTacToc = () => {
    const [data, setData] = useState(["","","","","","","","",""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        checkWin();
    }, [data]);

    const toogle = (num) => {
        if(lock) {
            return 0;
        } else {
            if (data[num] === "") {
                const newData = [...data];
                newData[num] = count % 2 === 0 ? 'o' : 'x';
                setData(newData);
                setCount(count + 1);
            }
        }
    };

    const checkWin = () => {
        if(data[0] === data[1] && data[1] === data[2] && data[2] !== ''){
            won(data[2]);
        } else if(data[3] === data[4] && data[4] === data[5] && data[5] !== '') {
            won(data[5]);
        } else if(data[6] === data[7] && data[7] === data[8] && data[8] !== '') {
            won(data[8]);
        } else if(data[0] === data[3] && data[3] === data[6] && data[6] !== '') {
            won(data[6]);
        } else if(data[1] === data[4] && data[4] === data[7] && data[7] !== '') {
            won(data[7]);
        } else if(data[2] === data[5] && data[5] === data[8] && data[8] !== '') {
            won(data[8]);
        } else if(data[0] === data[4] && data[4] === data[8] && data[8] !== '') {
            won(data[8]);
        } else if(data[2] === data[4] && data[4] === data[6] && data[6] !== '') {
            won(data[6]);
        }
    };

    const won = (win) => {
        setLock(true);
        if(win === 'x'){
            ref.current.innerHTML = `Congratulation: <img src=${close}/> <span>wins</span>`;
        } else {
            ref.current.innerHTML = `Congratulation: <img src=${circle}/> <span>wins</span>`;
        }
    };

    const reset = () => {
        setCount(0);
        setData(["","","","","","","","",""]);
        setLock(false);
        ref.current.innerHTML = `Tic Tac Toc <span>Game</span>`;
    }

    return (
        <div className="gamecontainer">
            <h1 className="title" ref={ref}>Tic Tac Toc <span>Game</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => {toogle(0)}}>
                        {data[0] === 'o' && <img src={circle} alt="circle"/>}
                        {data[0] === 'x' && <img src={close} alt="close"/>}
                    </div>
                    <div className="boxes" onClick={(e) => {toogle(1)}}>
                        {data[1] === 'o' && <img src={circle} alt="circle"/>}
                        {data[1] === 'x' && <img src={close} alt="close"/>}
                    </div>
                    <div className="boxes" onClick={(e) => {toogle(2)}}>
                        {data[2] === 'o' && <img src={circle} alt="circle"/>}
                        {data[2] === 'x' && <img src={close} alt="close"/>}
                    </div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => {toogle(3)}}>
                        {data[3] === 'o' && <img src={circle} alt="circle"/>}
                        {data[3] === 'x' && <img src={close} alt="close"/>}
                    </div>
                    <div className="boxes" onClick={(e) => {toogle(4)}}>
                        {data[4] === 'o' && <img src={circle} alt="circle"/>}
                        {data[4] === 'x' && <img src={close} alt="close"/>}
                    </div>
                    <div className="boxes" onClick={(e) => {toogle(5)}}>
                        {data[5] === 'o' && <img src={circle} alt="circle"/>}
                        {data[5] === 'x' && <img src={close} alt="close"/>}
                    </div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => {toogle(6)}}>
                        {data[6] === 'o' && <img src={circle} alt="circle"/>}
                        {data[6] === 'x' && <img src={close} alt="close"/>}
                    </div>
                    <div className="boxes" onClick={(e) => {toogle(7)}}>
                        {data[7] === 'o' && <img src={circle} alt="circle"/>}
                        {data[7] === 'x' && <img src={close} alt="close"/>}
                    </div>
                    <div className="boxes" onClick={(e) => {toogle(8)}}>
                        {data[8] === 'o' && <img src={circle} alt="circle"/>}
                        {data[8] === 'x' && <img src={close} alt="close"/>}
                    </div>
                </div>
            </div>
            <button className="reset" onClick={() => reset()}>Reset</button>
        </div>
    );
};

export default TicTacToc;