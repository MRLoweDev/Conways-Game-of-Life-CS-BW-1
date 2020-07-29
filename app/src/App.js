import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Board from './components/Board'
import './App.css'


function App() {
  const [currentBoard, setCurrentBoard] = useState([])
  const [boardSize, setBoardSize] = useState(25)


  function createBoard(newBoardSize) {
    let newBoard = []

    for (let i = 0; i < newBoardSize; i++) {
      let rows = []
      for (let j = 0; j < newBoardSize; j++) {
        rows.push({
          valueX: j,
          valueY: i,
          isAlive: false
        })
      }
      newBoard.push(rows)
    }
    setCurrentBoard(newBoard)
  }

  useEffect(() => {
    function setSize(newSize) {
      setBoardSize(newSize)
      createBoard(newSize)
    }
    setSize(boardSize)
  }, [boardSize])

  <h1> Conway Game of Life</h1>
  <AppWrapper>
    <GameWrapper>
      <Board currentBoard={currentBoard} size={boardSize} />
    </GameWrapper>
  </AppWrapper>
</div>
);
}

export default App;

const AppWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const GameWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
` 




// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
