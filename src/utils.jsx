import { cards } from './components/Card/cardList'

export function getNewCards() {
    const gameCards = [...cards];
    return gameCards;
}

function resetCardPlayability(deck) {
    for (var card of deck) {
        card.isPlayable = true;
    }
    return deck
}

export function shuffleDeck() {
    const newDeck = resetCardPlayability(getNewCards());
    for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
}




