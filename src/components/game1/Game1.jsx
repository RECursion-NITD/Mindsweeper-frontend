import React, { useState, useRef, useEffect } from 'react';
import './Game1.css';
import useAuth from '../../hooks/useAuth';
import { createGame, fetchGame1, validate } from '../../api/game1';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Alert from '../alert/Alert';

const Grid = () => {
  const [gridData, setGridData] = useState(Array(6).fill(Array(8).fill('')));
  const [gridDisabled,setGridDisabled] = useState(Array(6).fill(true));
  const inputRefs = useRef(Array(6).fill(null).map(() => Array(8).fill(null)));
  const [gameString, setGameString] = useState('');
  const [currCol, setCurrCol] = useState(0);
  const [currRow, setCurrRow] = useState(0);
  const [count,setCount] = useState(0);
  const { user,token } = useAuth();
  const [colorGrid,setColorGrid] = useState(Array(6).fill(Array(8).fill('3')));
  const [gameOver,setGameOver] = useState(false);
  const [heading, setHeading] = useState("");
  const [points, setPoints] = useState(0);


  const handleChange = (e, rowIndex, colIndex) => {
    const { value, keyCode } = e.target;
    if (/^[0-9+\-=*/]*$/.test(value) && value.length === 1 && keyCode !== 8) {
      const newData = gridData.map((row, index) =>
        index === rowIndex ? row.map((cell, i) => (i === colIndex ? value : cell)) : row
      );
      setGridData(newData);
      focusNextInput(rowIndex, colIndex);
    }

    if (/^[0-9+\-=*/]*$/.test(value) && value.length === 0 && keyCode !== 8) {
      const newData = gridData.map((row, index) =>
        index === rowIndex ? row.map((cell, i) => (i === colIndex ? value : cell)) : row
      );
      setGridData(newData);
    }
    if(value === ''){
      console.log('ok');
      const newData = gridData.map((row, index) =>
        index === rowIndex ? row.map((cell, i) => (i === colIndex ? '' : cell)) : row
      );
      setGridData(newData);
      // focusPrevInput(rowIndex, colIndex);
    }
  };

  

  const focusNextInput = (rowIndex, colIndex) => {
    const nextColIndex = (colIndex + 1) % 8;
    setCurrCol(nextColIndex);
    const nextRowIndex = nextColIndex === 0 ? rowIndex + 1 : rowIndex;
    setCurrRow(nextRowIndex);
    if (nextRowIndex < 6) {
      inputRefs.current[nextRowIndex][nextColIndex].focus();
    }
  };

  const focusPrevInput = (rowIndex, colIndex) => {
    const prevColIndex = colIndex === 0 ? 0 : colIndex-1;
    setCurrCol(prevColIndex);
    inputRefs.current[rowIndex][prevColIndex].focus();
  };

  const handleClickInGrid = () => {
    console.log(currRow,currCol);
    if (currCol === 0 && currRow !== 0) {
      let s = '';
      for (let i = 0; i < 8; i++) {
        s = s + gridData[currRow - 1][i];
      }
      validate(s,user.phone_number,token.access)
      .then((data) => {
        console.log(data);
        if(data.verdict !== -1){
          const string = data.validity;
          var newData = colorGrid.map((row, index) =>
              index === (currRow-1) ? row.map((cell, i) => (string[i])) : row
            );
          console.log(currRow,currCol);
          setGridDisabled((prevGridDisabled) => {
            const newDisabled = [...prevGridDisabled];
            newDisabled[currRow] = false;
            newDisabled[currRow - 1] = true;
            return newDisabled;
          });
          newData = newData.map((row, index) =>
              index === currRow ? row.map((cell, i) => ('-1')) : row
          );
          console.log(s);
          setColorGrid(newData);
          setGameString(s);
          setCount(1);
          if(data.verdict === 2){
            setGameOver(true);
            setHeading('Congratulations! You have successfully completed the game');
            setPoints(5); // hard coding points for now
            setGridDisabled(Array(6).fill(true));
          }
          else if(data.verdict === 1){
            setGameOver(true);
            setHeading('You did not guess the correct equation, Try again');
            setPoints(0);  // hard coding points for now
            setGridDisabled(Array(6).fill(true));
          }
        }
        else{
          toast.error( data.message, {
            position: "bottom-center",
          });
        }
      })
    }

  };

  const handleKeyPress = (e, rowIndex, colIndex) => {
    console.log(e.key);
    if (e.key === 'Backspace') { // Check if the backspace key was pressed
      const newData = gridData.map((row, index) =>
        index === rowIndex ? row.map((cell, i) => (i === colIndex ? '' : cell)) : row
      );
      setGridData(newData);
      focusPrevInput(rowIndex, colIndex);
    }
    else if(e.key === 'Enter'){
      handleClickInGrid();
    }
    else{
      const { value, keyCode } = e.target;
      if (/^[0-9+\-=*/]*$/.test(value) && value.length === 1 && keyCode !== 8) {
        const newData = gridData.map((row, index) =>
          index === rowIndex ? row.map((cell, i) => (i === colIndex ? value : cell)) : row
        );
        setGridData(newData);
        focusNextInput(rowIndex, colIndex);
      }
    }
  };

  const createGameHandler = async () => {
    createGame(token.access,user.phone_number)
    .then((data)=>{
        if(data.message === 'done'){
          toast.success( data.message, {
            position: "bottom-center",
          });
          var arr = Array(6).fill(Array(8).fill(''));
          setGridData(arr);
          var color = Array(6).fill(Array(8).fill('0'));
          color[0] = Array(8).fill('-1');
          setColorGrid(color);
          var disabled = Array(6).fill(true);
          disabled[0] = false;
          console.log(disabled);
          setCount(0);
          setGridDisabled(disabled);
          inputRefs.current[0][0].focus();
        }
        else{
          toast.error( data.message, {
            position: "bottom-center",
          });
        }
      }
    );
  };

  useEffect (() => {
    fetchGame1(token.access,user.phone_number)
      .then((data)=>{
        setGridData(data.stringArray)
        setColorGrid(data.verdictArray)
        var disabled = Array(6).fill(true);
        disabled[data.moves] = false;
        setCurrRow(data.moves);
        setCurrCol(0)
        if(data.moves !== 0){
          setCount(1);
        }
        setGridDisabled(disabled);
      });
    },[]);

  return (
    <div className="grid-container">
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              className="grid-cell"
              type="numeric"
              maxLength="1"
              value={gridData[rowIndex][colIndex]}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
              disabled={rowIndex === 0 ? count!==0 : gridDisabled[rowIndex]}
              ref={(input) => (inputRefs.current[rowIndex][colIndex] = input)}
              style={{ backgroundColor: colorGrid[rowIndex][colIndex] === '1' ? 'purple' : colorGrid[rowIndex][colIndex] === '2' ? 'green' : colorGrid[rowIndex][colIndex] === '0' ? 'grey' : '' }}
            />
          ))}
        </div>
      ))}
      <div className='btns'>
        <button onClick={handleClickInGrid}>Submit</button>
        <button onClick={createGameHandler}>Reset</button>
      </div>
      {gameOver && <Alert heading={heading} points={points} setGameOver={setGameOver}/>}
    </div>
  );
};

const Game1 = () => {

  return (
    <>
      <div className='game1-heading'>Maths Wordle</div>
      <Grid/>
      <ToastContainer />
    </>
  );
};

export default Game1;