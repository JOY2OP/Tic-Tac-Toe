'use client'

import './page.css';
import { useState } from 'react';

function Square({value, onSquareClick}){
  return (<button className='square' onClick={onSquareClick}>{value}</button>)
}

const Board = ({xIsNext, onPlay, squares}) => {

//Stops the game if winner is found || Doesnt let the same tile clicked twice
  function handleClick(i){
    if (checkWinner(squares)||squares[i]){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }
    
    onPlay(nextSquares)
  }

  const winner = checkWinner(squares)
  let status;
  if (winner){
    status= "Winner: " + winner
  }else if(!squares.includes(null)){
      status= "Draw"
  } else{  
    status = "Next Player: " + (xIsNext ? "X" : "O")
  }
  

  return (
    <>  
    <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>   
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>        
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>        
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>        
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div> 
    
   </>
  )
}

const Game = ()=>{
  // const [xIsNext, setXIsNext] = useState(true);  //Helps toggling players
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove %2 === 0 //top line of this function converted
  const currentSquares = history[currentMove]
  // console.log(squares)


  //When user clicks on board
  function handleClick(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1)
    }

  //Time travel button
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {  //move contains the the index
    let description;
    if (move>0){
      description = 'Go to move#' + move;
    } else{
      description = 'Go to game start'
    }
    return (
      <li key={move}><button onClick={()=> jumpTo(move)}>{description}</button></li>
    )
  })

  //Resets the game
  function handleReset(){
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handleClick}/>
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>       
      </div>
      <div className='reset'>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

function checkWinner(squares){   //it s just param with same name, not squares array
const combination = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
for (let i=0; i<combination.length; i++){
  const [a,b,c] = combination[i];
  if (squares[a] && squares[a] ===squares[b] && squares[a]===squares[c]){

    return squares[a];
  }
}
return null;
}

export default Game;
