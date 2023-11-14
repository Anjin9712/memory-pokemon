import './Opponents.css'

export default function Opponents({setOpponent, backToMenu}) {

    function setOpponentAndGoBack(event) {
        setOpponent(event.target.value);
        backToMenu();
    }

    function toggleShow(event) {
        const targetId = event.target.id;
        const caret = document.querySelector(`#${targetId}Caret`);
        caret.classList.toggle("hide");
      }

    return(
        <div id='opponents'>
            <p>Eskoja oponente pirobo: </p>

            <div id="easyContainer" className="difficultyContainer">
                <i id="easyCaret" className="fa-solid fa-caret-right hide"></i>
                <button id="easy"
                    onMouseEnter={toggleShow} 
                    onMouseLeave={toggleShow} 
                    onClick={setOpponentAndGoBack}
                    value="Braider Andres"
                >
                    Braider Andres
                </button>
            </div>

            <div id="mediumContainer" className="difficultyContainer">
                <i id="mediumCaret" className="fa-solid fa-caret-right hide"></i>
                <button id="medium"
                    onMouseEnter={toggleShow} 
                    onMouseLeave={toggleShow} 
                    onClick={setOpponentAndGoBack} 
                    value="Valloleidys"
                >
                    Valloleidys
                </button>

            </div>
            
            <div id="hardContainer" className="difficultyContainer">
                <i id="hardCaret" className="fa-solid fa-caret-right hide"></i>
                <button id="hard"
                    onMouseEnter={toggleShow} 
                    onMouseLeave={toggleShow} 
                    onClick={setOpponentAndGoBack} 
                    value="El Brayan"
                >
                    El Brayan
                </button>
            </div>
            
        </div>
    )
}