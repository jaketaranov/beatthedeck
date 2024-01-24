import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import { shuffleDeck } from "./utils";
import { cards } from "./components/Card/cardList";
// import { cards } from "./components/card/cardList";
// import { flushSync } from "react-dom";
function App() {
  const [showingDeck, setShowingDeck] = useState([]);
  const [playableDeck, setPlayableDeck] = useState([]);
  const [gameAlive, setGameAlive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [pilesRemaining, setPilesRemaining] = useState(8);
  const [helpActive, setHelpActive] = useState(false);
  const [firstGameActivated, setFirstGameActivated] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);
  const [cardsRemaining, setCardsRemaining] = useState(43);

  const newGame = () => {
    setGameOver(false);
    setGameAlive(true);
    setFirstGameActivated(true);
    setPilesRemaining(8);
    const deck = shuffleDeck();
    setShowingDeck(deck.slice(0, 9));
    setPlayableDeck(deck.slice(9, 53));
  };

  const getNewCard = () => {
    const copyDeck = [...playableDeck];
    const playCard = copyDeck.pop();
    setPlayableDeck([...copyDeck]);
    return playCard;
  };

  const updatePlayerStatus = (didWin) => {
    setGameOver(true);
    setPlayerWon(didWin);
    setGameAlive(false);
    setShowingDeck([]);
    setPlayableDeck([]);
  };

  const checkPlayerWon = () => {
    return playableDeck.length === 1;
  };

  const checkGameOver = () => {
    return pilesRemaining == 0;
  };

  const updateTable = (prevCardIndex, newCard, playability) => {
    const copyDeck = [...showingDeck];
    copyDeck[prevCardIndex] = newCard;
    copyDeck[prevCardIndex].isPlayable = playability;

    setCardsRemaining(cardsRemaining - 1);

    if (!playability) {
      setPilesRemaining(pilesRemaining - 1);
    }
    setShowingDeck([...copyDeck]);

    if (checkGameOver()) {
      updatePlayerStatus(false);
    }
    if (checkPlayerWon()) {
      updatePlayerStatus(true);
    }
  };

  const compareHigher = (cardIndex) => {
    const newCard = getNewCard();
    const playability = newCard.rank > showingDeck[cardIndex].rank;
    updateTable(cardIndex, newCard, playability);
  };

  const compareLower = (cardIndex) => {
    const newCard = getNewCard();
    const playability = newCard.rank < showingDeck[cardIndex].rank;
    updateTable(cardIndex, newCard, playability);
  };

  const updateSetHelpActive = () => {
    setHelpActive(!helpActive);
  };

  return (
    <div>
      <div className="titleContainer">
        <h1 className="title">BEAT THE DECK</h1>
      </div>
      {firstGameActivated ? (
        <div>
          <div className="startGameContainer">
            <button onClick={newGame} className="btn-32">
              {" "}
              New Game{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="startGameContainer">
          <button onClick={newGame} className="btn-32">
            {" "}
            Start Game{" "}
          </button>
        </div>
      )}

      <div className="startGameContainer">
        <button onClick={updateSetHelpActive} className="btn-32">
          {" "}
          Help
        </button>
      </div>
      <div className="tipsContainer">
        {helpActive && (
          <ul className="tipsList">
            <li className="tip">
              • Your objective is to utilize the entire deck without depleting
              the available card piles.
            </li>
            <li className="tip">
              • Hover over a card and choose whether the next card will be
              higher or lower, depending on the current card.
            </li>
            <li className="tip">
              • If your guess is correct, the card pile stays active; if
              incorrect, the pile is eliminated.
            </li>
            <li className="tip">
              • You emerge victorious when the remaining cards reach zero.
            </li>
            <li className="tip">• Aces hold a high rank in the game. </li>
          </ul>
        )}
      </div>
      {gameAlive && (
        <div>
          <div className="cardsLeftHeaderContainer">
            <h2 className="cardsLeftHeader">Cards Left In Deck</h2>
          </div>
          <div className="cardsLeftContainer">
            <h3 className="cardsLeft">{playableDeck.length}</h3>
          </div>
        </div>
      )}

      <div className="grid">
        {showingDeck.map((card, index) => (
          <div key={index}>
            {card.isPlayable ? (
              <div className="cardContainer">
                <button
                  className="higher"
                  onClick={() => compareHigher(index)}
                />
                <Card suit={card.suit} value={card.value}></Card>
                <button className="lower" onClick={() => compareLower(index)} />
              </div>
            ) : (
              <div className="cardContainer">
                <Card suit="skull" value={card.value}></Card>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="playerMessageStatusContainer">
        {!playerWon && gameOver && (
          <div className="gameOverWrapper">
            {/* <div className="skullGameOverIcon"></div> */}
            <p className="playerMessageStatus">
              Nice try! But you were unable to beat the deck, you had{" "}
              {cardsRemaining} cards left
            </p>
          </div>
        )}
      </div>
      <div className="playerMessageStatusContainer">
        {playerWon && gameOver && (
          <p className="playerMessageStatus">
            Congrats! You were able to beat the deck
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
