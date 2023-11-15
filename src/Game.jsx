import { useCallback, useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading.jsx";
import './Game.css';
import gameOver from "./assets/gameOver.gif"

export default function Game({opponent, backToMenu, highScore, setHighScore, highScores, setHighScores}) {

    const [loading, setLoading] = useState(true);
    const [randomCards, setCards] = useState({});
    const [score, setScore] = useState(0);
    const [playAgain, setPlayAgain] = useState(0);

    const opponents = {
        "Braider Andres": 6,
        "Valloleidys": 9,
        "El Brayan": 12
    };

    function newGame() {
        setLoading(true)
        setCards({})
        setScore(0)
        setPlayAgain(prev => prev + 1)
    }

    const generateCards = async () => {

        const randomPokemonImages = {};

        for (let i = 0; i < opponents[opponent]; i++) {

            const randomIndex = Math.floor(Math.random() * (1017 + 1));
            const randomPokemonImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`)
                                .then(response => response.json())
                                .then(data => (
                                    data.sprites.front_default
                                ))

            randomPokemonImages[randomIndex] = {
                clicked: false,
                img: randomPokemonImage
            }
        }

        setTimeout(() => {
            setCards(randomPokemonImages)
            setLoading(false) 
        }, 1500);
        
    }

    useEffect(() => {
        generateCards()
    }, [playAgain])

    const updateHighScores = useCallback(() => {
        const isTopFive = [...highScores].some(highScore => score > highScore)

        const isUnique = [...highScores].every(highScore => score != highScore)
        

        if (isTopFive && isUnique || [...highScores].length === 0 || [...highScores].length < 5) {
            let updatedHighScores = [score].concat(highScores) 
                
            updatedHighScores.sort((a, b) => b - a);

            if (updatedHighScores.length > 5) {
                updatedHighScores.pop();
            }

            setHighScores(updatedHighScores)
            localStorage.setItem('highScores', JSON.stringify(updatedHighScores))
        } 

        }, [highScores, setHighScores, score])

    function checkIfRepeated(event) {

        const id = event.currentTarget.id;
    
        if (randomCards[id].clicked) {
            updateHighScores()
            const gameOverDialog = document.querySelector("#gameOverDialog");
            gameOverDialog.showModal()
            
        } else {
            const updatedCard = {...randomCards[id], clicked: true};
            setCards(prevInfo => ({...prevInfo, [id]: updatedCard}));
            setScore(prevRound => prevRound + 1);
        }
    }

    function flipCards() {
        setTimeout(() => {
            const cards = [...document.querySelectorAll('.flip-card-inner')];
            cards.forEach(card => card.style = {transform: "rotateY(180deg)"})
        }, 1000);
        
    }

    function shuffle(array) {
        const shuffledArr = [].concat(array);
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            const currentItem = shuffledArr[i];
            shuffledArr[i] = shuffledArr[randomIndex];
            shuffledArr[randomIndex] = currentItem;
        }
        return shuffledArr
    }

    function renderCards() {
        const listItems = [];

        for (const key in randomCards) {

            const card = <li className="flip-card" key={key} id={key} onClick={checkIfRepeated}>
                            <div className="flip-card-inner" style={{transform: "rotateY(180deg)"}}>
                                <div className="flip-card-front">
                                    <img className="pokemon-img" src={randomCards[key].img} />
                                </div>
                                <div className="flip-card-back">
                                    <img className="backImage" 
                                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5597b257-810c-4379-90f0-af775dbf1890/d6i7mbi-90cbb340-ae91-429d-beba-63c374359405.png/v1/fit/w_750,h_1050/pseudo_japanese_style_pokemon_card_back_by_iamthedaveo_d6i7mbi-375w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA1MCIsInBhdGgiOiJcL2ZcLzU1OTdiMjU3LTgxMGMtNDM3OS05MGYwLWFmNzc1ZGJmMTg5MFwvZDZpN21iaS05MGNiYjM0MC1hZTkxLTQyOWQtYmViYS02M2MzNzQzNTk0MDUucG5nIiwid2lkdGgiOiI8PTc1MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.B8So6976b-IBJSkO6WZQdpi7G-YsgtImKqHJE7ryPFI"
                                     />
                                </div>
                            </div>
                        </li>;

            listItems.push(card)
        }

        return shuffle(listItems)
    }

    if (highScore < score) {
        setHighScore(score);
        localStorage.setItem('highScore', JSON.stringify(score));          
    }

    useEffect(() =>{
        if (score === opponents[opponent]) {
            updateHighScores();
            const youWinDialog = document.querySelector("#youWinDialog");
            youWinDialog.showModal();
        }
    }, [score])
    

    if (loading) {
        return(
            <>
                <Loading />
            </>
        )
    } else {
        return(
            <div id="game-container">
                <div id="game-info">
                    <h2>Score: {score}</h2>
                    <h2>Highest Score: {highScore}</h2>
                </div>
                <ul>
                    {renderCards()}
                    {flipCards()}
                    <dialog className="afterGameDialog" id="gameOverDialog">
                        <img src={gameOver} alt="" />
                        <h2>Game Over</h2>
                        <button onClick={backToMenu}>Back to menu</button>
                        <button onClick={newGame}>Play again</button>
                    </dialog>
                    <dialog className="afterGameDialog" id="youWinDialog">
                        <img src="https://i.giphy.com/media/xuXzcHMkuwvf2/giphy.webp" alt="" />
                        <h2>You Win</h2>
                        <button onClick={backToMenu}>Back to menu</button>
                        <button onClick={newGame}>Play again</button>
                    </dialog>
                </ul>
            </div>
        )
    }
    
}