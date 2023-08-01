// Código blackjack

let deck              = [];
const tipos           = ['C', 'H', 'D', 'S']
const figuras         = ['A', 'J', 'K', 'Q']

let puntosJugador     = 0;
let puntosComputadora = 0;

// botones
const btnPedir = document.getElementById('btnPedir')

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

crearDeck();

/**
 * Esta función saca la última carta
 * @returns carta
 */
const pedirCarta = () => {
    if(deck) throw 'No hay cartas en juego'
    const carta = deck.pop();
    return carta;
}

/**
 * Esta función retorna el valor de carta
 * @param {*} carta carta para obtener el valor
 * @returns 
 */
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.lenght-1);
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11 : 10 
     : valor*1;
}

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
})