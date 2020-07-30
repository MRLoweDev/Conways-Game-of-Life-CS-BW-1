// import React, { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components'
import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import Footer from './components/Footer'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import SideBar from "./components/SideBar"


// function App() {
//   const [currentBoard, setCurrentBoard] = useState([])
//   const [boardSize, setBoardSize] = useState(25)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentBoard: [],
      boardSize: 25,
      generation: 0,
      gameOn: false,
      gameSpeed: 100,
    };
  }

  // function createBoard(newBoardSize) {
  createBoard = (newBoardSize) => {
    let newBoard = []

    // for (let i = 0; i < newBoardSize; i++) {
    //   let rows = []
    //   for (let j = 0; j < newBoardSize; j++) {
    //     rows.push({
    //       axisX: j,
    //       axisY: i,
    //       isAlive: false
    //     })
    for (let x = 0; x < newBoardSize; x++) {
      let rowOfCells = []
      for (let y = 0; y < newBoardSize; y++) {
        rowOfCells.push({
          xVal: y,
          yVal: x,
          isAlive: false,
        });
      }
      newBoard.push(rowOfCells);
    }
    this.setState({
      currentBoard: newBoard
    })
  }

  setNewSize = (newBoardSize) => {
    this.setState({
      boardSize: newBoardSize
    });
    this.createBoard(newBoardSize)
  }

  componentDidMount() {
    this.setNewSize(this.state.boardSize)
  };


  clearBoard = () => {
    let newBoard = []
    for (let x = 0; x < this.state.boardSize; x++) {
      let rowOfCells = []
      for (let y = 0; y < this.state.boardSize; y++) {
        rowOfCells.push({
          xVal: y,
          yVal: x,
          isAlive: false,
        });
      }
      // newBoard.push(rows)
      newBoard.push(rowOfCells);
    }
    // setCurrentBoard(newBoard)
    this.setState({
      currentBoard: newBoard,
      generation: 0,
      gameOn: false
    })
  }

  // useEffect(() => {
  //   function setSize(newSize) {
  //     setBoardSize(newSize)
  //     createBoard(newSize)

  toggleCell = cell => {
    if (!this.state.gameOn) {

      let curBoard = this.state.currentBoard.slice();

      curBoard[cell.yVal][cell.xVal].isAlive = !cell.isAlive
      this.setState({
        currentBoard: curBoard
      });
    }


  };

  computeAlgorithm = () => {

    let nextGenBoard = [];
    const size = this.state.boardSize;

    for (let x = 0; x < size; x++) {
      let BoardRow = []
      for (let y = 0; y < size; y++) {
        BoardRow.push({ ...this.state.currentBoard[x][y] })

      }
      nextGenBoard.push(BoardRow);
    }

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        let neighbors = 0;
        if (x < size - 1) {
          if (this.state.currentBoard[y][x + 1].isAlive) {
            neighbors++
          }
        }
        if (y < size - 1 && x < size - 1) {
          if (this.state.currentBoard[y + 1][x + 1].isAlive) {
            neighbors++
          }
        }
        if (y < size - 1) {
          if (this.state.currentBoard[y + 1][x].isAlive) {
            neighbors++
          }
        }
        if (y < size - 1 && x > 0) {
          if (this.state.currentBoard[y + 1][x - 1].isAlive) {
            neighbors++
          }
        }
        if (x > 0) {
          if (this.state.currentBoard[y][x - 1].isAlive) {
            neighbors++
          }
        }

        if (x > 0 && y > 0) {
          if (this.state.currentBoard[y - 1][x - 1].isAlive) {
            neighbors++

          }
        }

        if (y > 0) {
          if (this.state.currentBoard[y - 1][x].isAlive) {
            neighbors++

          }
        }

        if (y > 0 && x < size - 1) {
          if (this.state.currentBoard[y - 1][x + 1].isAlive) {
            neighbors++

          }
        }

        if (this.state.currentBoard[y][x].isAlive === false && neighbors === 3) {
          nextGenBoard[y][x].isAlive = true;
        }

        if (this.state.currentBoard[y][x].isAlive === true && (neighbors > 3 || neighbors < 2)) {
          nextGenBoard[y][x].isAlive = false;
        }
      }
    }
  //   setSize(boardSize)
  // }, [boardSize])

  // function toggleAliveState(cell) {
  //   let currentBo = currentBoard.slice()
  //   currentBo[cell.axisY][cell.axisX].isAlive = !cell.isAlive
  //   setCurrentBoard(currentBo)
    this.setState({
      generation: this.state.generation + 1,
      currentBoard: nextGenBoard
    })
  }

  startGame = () => {
    this.setState({
      gameOn: true
    });
    this.nextGeneration()
  }

  // return (
  //   <div className="App">
  //     <Header />
  //     <TopBar />
  //     <AppWrapper>
  //       <GameWrapper>
  //         <Board currentBoard={currentBoard} size={boardSize} toggleAliveState={toggleAliveState} />
  //       </GameWrapper>
  //     </AppWrapper>
  //     <BottomBar />
  //     <Footer />
  //   </div>
  // );
  nextGeneration = () => {
    this.computeAlgorithm();
    setTimeout(() => {
      if (this.state.gameOn) {

        this.nextGeneration()
      }
    }, this.state.gameSpeed)
  };


  stopGame = () => {
    this.setState({
      gameOn: false
    });
  };

  randomizeBoard = () => {
    let randomBoard = []
    for (let x = 0; x < this.state.boardSize; x++) {
      let rowOfCells = []
      for (let y = 0; y < this.state.boardSize; y++) {
        const random = !!Math.round(Math.random());
        rowOfCells.push({
          xVal: y,
          yVal: x,
          isAlive: random,
        });
      }
      randomBoard.push(rowOfCells);
    }
    this.setState({
      currentBoard: randomBoard
    })
  }
  render() {

    return (
      <div className="App">
        <Header />
        <TopBar currentGeneration={this.state.generation} />
        <AppWrapper>
          <GameWrapper>
            <Board currentBoard={this.state.currentBoard} size={this.state.boardSize} toggleAliveState={this.toggleCell} />
          </GameWrapper>
          <SideBar randomBoard={this.randomizeBoard} stopGame={this.stopGame} boardResize={this.setNewSize} />
        </AppWrapper>
        <BottomBar playGame={this.startGame} stopGame={this.stopGame} clearBoard={this.clearBoard} />
        <Footer />
      </div>
    );
  }
}

export default App;

const AppWrapper = styled.div`
border:2px solid red;
display: flex;
justify-content: space-evenly;
align-items: center;
margin-bottom: 20px;
`
const GameWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`