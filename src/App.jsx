import { useEffect, useState } from 'react'
import './App.css'
import Menu from './Menu';
import Opponents from './Opponents';
import Game from './Game';
import pokeball from './assets/pokeball.svg'
import HighScores from './HighScores';

function App() {

  console.log("Puto el que lo lea")

  const [currentComponent, setCurrentComponent] = useState("menu");
  const [opponent, setOpponent] = useState("Braider Andres");
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore')? localStorage.getItem('highScore'): 0);
  const [highScores, setHighScores] = useState(localStorage.getItem('highScores')? JSON.parse(localStorage.getItem('highScores')): [])

  function backToMenu() {
    setCurrentComponent("menu")
  }

  function displayComponent(currentComponent) {
    switch (currentComponent) {
      case "menu":
        return <Menu 
          opponent={opponent}
          updateCurrentComponent={setCurrentComponent}
        />;

      case "opponents":
        return <Opponents 
          setOpponent={setOpponent}
          backToMenu={backToMenu}
        />

      case "scores":
        return <HighScores 
        scores={highScores}
        backToMenu={backToMenu}/>
        
      case "game":
        return <Game 
          opponent={opponent}
          backToMenu={backToMenu}
          highScore={highScore}
          setHighScore={setHighScore}
          highScores={highScores}
          setHighScores={setHighScores}
          currentComponent={currentComponent}
        />;
      default:
        return null;
    }
  }

  return (
    <>
      <div id='main-container'>
        <header onClick={backToMenu}>
          <img src={pokeball} alt="" />
          <h1>Poke<span>Nea</span></h1>
        </header>

        {displayComponent(currentComponent)}
        
      </div>
    </>
  )
}

export default App