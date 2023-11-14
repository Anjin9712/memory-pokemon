import './Menu.css';

export default function Menu({opponent, updateCurrentComponent}) {

    function display(event) {
      updateCurrentComponent(event.target.value)
    }

    function toggleShow(event) {
        const targetId = event.target.id;
        const caret = document.querySelector(`#${targetId}Caret`);
        caret.classList.toggle("hide");
      }

    return(
        <div id='menu'>
          <p><span id='opponent'>{opponent}</span> dice: Khe kiere ome gonorrea ome.</p>

          <div id="option1Container" className="optionContainer">
            <i id="option1Caret" className="fa-solid fa-caret-right hide"></i>
            <button id='option1'
              value="game"
              onMouseEnter={toggleShow} 
              onMouseLeave={toggleShow}
              onClick={display}
            >
              Pintela khe ze la kolorheo piruja
            </button>
          </div>

          <div id="option2Container" className="optionContainer">
            <i id="option2Caret" className="fa-solid fa-caret-right hide"></i>
            <button id='option2' 
              value="opponents" 
              onMouseEnter={toggleShow} 
              onMouseLeave={toggleShow} 
              onClick={display}
            >
              Cambiar oponente
            </button>
          </div>
          
          <div id="option3Container" className="optionContainer">
            <i id="option3Caret" className="fa-solid fa-caret-right hide"></i>
            <button id='option3' 
            value="scores"
              onMouseEnter={toggleShow} 
              onMouseLeave={toggleShow}
              onClick={display}
            >
              Puntajes mas azarosos
            </button>
          </div>
          
          
        </div>
    )
}