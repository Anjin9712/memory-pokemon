import './Loading.css'
import pokeball from './assets/pokeball.svg'

export default function Loading() {
    return(
        <div id="loading-container">
            <img src={pokeball} alt="" />
            <h2>Poke-Nea esta cargando</h2>
        </div>
    )
}