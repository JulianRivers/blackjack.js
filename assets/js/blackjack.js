// Código blackjack

let deck              = [];
const tipos           = ['C', 'H', 'D', 'S']
const figuras         = ['A', 'J', 'K', 'Q']

let puntosJugador     = 0;
let puntosComputadora = 0;

//elementos
const puntos  = document.querySelectorAll('small');
const cartasJugador = document.getElementById('jugador-cartas')
const cartasComputadora = document.getElementById('computadora-cartas')
const btnPedir = document.getElementById('btnPedir')
const btnDetener = document.getElementById('btnDetener')
const btnNuevo = document.getElementById('btnNuevo')


/**
 * Esta función crea un mazo de cartas
 * @returns Deck
 */
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) { 
        tipos.forEach(tipo => {
            deck.push(i + tipo);
        });
    }
    for (let tipo of tipos) {
        for (let figura of figuras) {
            deck.push(figura + tipo)
        }
    }
    return _.shuffle(deck);
}

deck = crearDeck();

/**
 * Esta función saca la última carta
 * @returns carta
 */
const pedirCarta = () => {
    if(deck.length==0) throw 'No hay cartas en juego'
    const carta = deck.pop();
    return carta;
}

/**
 * Esta función retorna el valor de carta
 * @param {*} carta carta para obtener el valor
 * @returns 
 */
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11 : 10 
     : valor*1;
}

const turnoComputadora = ( puntosMinimos ) => {
    do{
    const carta   = pedirCarta();
    const imgCarta = document.createElement('img');
    imgCarta.src =`/assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')

    puntosComputadora = puntosComputadora+valorCarta(carta);
    puntos[1].innerText = puntosComputadora;
    cartasComputadora.append(imgCarta)
    } while(puntosMinimos <= 21 && puntosComputadora<puntosMinimos);
 
    if((puntosJugador > puntosComputadora || puntosComputadora >21) && puntosJugador <= 21){
        alert("Jugador ganó")
    } else{
        alert("Maquina ganó")
    }
}
// Eventos
btnPedir.addEventListener('click', () => {
    const carta   = pedirCarta();
    const imgCarta = document.createElement('img');
    imgCarta.src =`/assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')


    puntosJugador = puntosJugador+valorCarta(carta);
    puntos[0].innerText = puntosJugador;
    cartasJugador.append(imgCarta)
    
    if(puntosJugador >= 21) {
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador);
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {
    btnPedir.disabled = false
    btnDetener.disabled = false
    puntos[0].innerText = 0
    puntos[1].innerText = 0
    deck = [];
    deck = crearDeck();
    puntosJugador=0
    puntosComputadora=0
    cartasComputadora.innerHTML = ''
    cartasJugador.innerHTML = ''
    console.log(deck)
})