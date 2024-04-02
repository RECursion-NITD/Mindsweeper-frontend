import React, { useState, useRef } from 'react';
import './Game1.css';
import useAuth from '../../hooks/useAuth';

const Grid = () => {
  const [gridData, setGridData] = useState(Array(6).fill(Array(8).fill('')));
  const [gridDisabled,setGridDisabled] = useState(Array(6).fill(true));
  const inputRefs = useRef(Array(6).fill(null).map(() => Array(8).fill(null)));
  const [gameString, setGameString] = useState('');
  const [currCol, setCurrCol] = useState(0);
  const [currRow, setCurrRow] = useState(0);
  const [count,setCount] = useState(0);
  const { phone_number,token } = useAuth();
  const [colorGrid,setColorGrid] = useState(Array(6).fill(Array(8).fill('3')));

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
  };

  const validate = async (input, phn) => {
    console.log(token)
    const response = await fetch(
      "http://localhost:8000/game/api/validate/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${token.bearer}`,
        },
        body: JSON.stringify({
          input: input,
          phone: phn,
        }),
      }
    );
  
    const data = await response.json();
    console.log("data", data);
    const string = data.validity;
    const newData = colorGrid.map((row, index) =>
        index === (currRow-1) ? row.map((cell, i) => (string[i])) : row
      );
    setColorGrid(newData);
    return data;
  }
  

  const focusNextInput = (rowIndex, colIndex) => {
    const nextColIndex = (colIndex + 1) % 8;
    setCurrCol(nextColIndex);
    const nextRowIndex = nextColIndex === 0 ? rowIndex + 1 : rowIndex;
    setCurrRow(nextRowIndex);
    if (nextRowIndex < 6) {
      inputRefs.current[nextRowIndex][nextColIndex].focus();
    }
  };

  const handleClickInGrid = () => {
    if (currCol === 0 && currRow !== 0) {
      let s = '';
      for (let i = 0; i < 8; i++) {
        s = s + gridData[currRow - 1][i];
      }
      setGridDisabled((prevGridDisabled) => {
        const newDisabled = [...prevGridDisabled];
        newDisabled[currRow] = false;
        newDisabled[currRow - 1] = true;
        return newDisabled;
      });
      setGameString(s);
      setCount(1);
    }

  };

  React.useEffect(()=>{
    validate(gameString,1023656789)
  },[gameString]);

  return (
    <div className="grid-container">
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              className="grid-cell"
              type="text"
              maxLength="1"
              value={gridData[rowIndex][colIndex]}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              disabled={rowIndex === 0 ? count!==0 : gridDisabled[rowIndex]}
              ref={(input) => (inputRefs.current[rowIndex][colIndex] = input)}
              style={{ backgroundColor: colorGrid[rowIndex][colIndex] === '1' ? 'purple' : colorGrid[rowIndex][colIndex] === '2' ? 'green' : colorGrid[rowIndex][colIndex] === '0' ? 'grey' : '' }}
            />
          ))}
        </div>
      ))}
      <button onClick={handleClickInGrid}>Submit</button>
    </div>
  );
};

const Game1 = () => {

  return (
    <>
      <div>Game1</div>
      <Grid/>
    </>
  );
};

export default Game1;
