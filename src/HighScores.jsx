import './HighScores.css'

export default function HighScores({scores, backToMenu}) {
    function renderScores(arr) {
        const myArr = arr.map((score, index) => {
           return <li key={`highScore${index}`}>
                    <p>{score} pokebichos</p>
                </li>
    })
        
        return myArr
    }
    return(
        <div id="highScoresContainer">
            <h2>High Scores</h2>
            <ol id='highScores'>
                {renderScores(scores)}
            </ol>
            <button onClick={backToMenu}>Back to menu</button>
        </div>
    )
}