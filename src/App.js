import React, { Component } from "react";
import shuffle from "lodash.shuffle";

import "./App.css";
import HighScoreInput from "./HighScoreInput";
import Card from "./Card";
import GuessCount from "./GuessCount";
import HallOfFame from "./HallOfFame";
const SIDE = 6;
export const SYMBOLS = "😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿";
const VISUAL_PAUSE_MSECS = 750;

class App extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    hallOfFame: null,
    matchedCardIndices: []
  };

  displayHallofFame = hallOfFame => {
    this.setState({ hallOfFame });
  };
  generateCards() {
    const result = [];
    const size = SIDE * SIDE;
    const candidates = shuffle(SYMBOLS);
    while (result.length < size) {
      const card = candidates.pop();
      result.push(card, card);
    }
    return shuffle(result);
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state;
    const indexMatched = matchedCardIndices.includes(index);

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? "visible" : "hidden";
    }

    if (currentPair.includes(index)) {
      return indexMatched ? "justMatched" : "justMismatched";
    }

    return indexMatched ? "visible" : "hidden";
  }

  // @autobind not availlibe in create react app
  // so arrow  for binding this, to get a this availlaible
  // https://openclassrooms.com/en/courses/4664381-realisez-une-application-web-avec-react-js/4664866-faites-reference-au-bon-this-dans-vos-fonctions
  // Arrow fx for binding
  handleCardClick = index => {
    const { currentPair } = this.state;

    if (currentPair.length === 2) {
      return;
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] });
      return;
    }

    this.handleNewPairClosedBy(index);
  };

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state;

    const newPair = [currentPair[0], index];
    const newGuesses = guesses + 1;
    const matched = cards[newPair[0]] === cards[newPair[1]];
    this.setState({ currentPair: newPair, guesses: newGuesses });
    if (matched) {
      this.setState({
        matchedCardIndices: [...matchedCardIndices, ...newPair]
      });
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
  }

  render() {
    const { cards, guesses, hallOfFame, matchedCardIndices } = this.state;
    const won = matchedCardIndices.length === 4; //SIDE * SIDE
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />

        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            key={index}
            index={index}
            onClick={this.handleCardClick}
          />
        ))}

        {won &&
          (hallOfFame ? (
            <HallOfFame entries={hallOfFame} />
          ) : (
            <HighScoreInput
              guesses={guesses}
              onStored={this.displayHallofFame}
            />
          ))}
      </div>
    );
  }
}

export default App;
