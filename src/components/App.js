import React, { Component } from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {
  state = {
    players: [
      {
        name: 'Guil',
        score: 0,
        id: 1,
        isHighScore: false,
      },
      {
        name: 'Treasure',
        score: 0,
        id: 2,
        isHighScore: false,
      },
      {
        name: 'Ashley',
        score: 0,
        id: 3,
        isHighScore: false,
      },
      {
        name: 'James',
        score: 0,
        id: 4,
        isHighScore: false,
      },
    ],
  };

  // player id counter
  prevPlayerId = 4;

  handleScoreChange = (index, delta) => {
    this.setState((prevState) => {
      // New 'players' array – a copy of the previous `players` state
      const updatedPlayers = [...prevState.players];
      // A copy of the player object we're targeting
      const updatedPlayer = { ...updatedPlayers[index] };

      // Update the target player's score
      updatedPlayer.score += delta;
      // Update the 'players' array with the target player's latest score
      updatedPlayers[index] = updatedPlayer;
      // Update the `players` state without mutating the original state
      return {
        players: updatedPlayers,
      };
    });
  };

  handleAddPlayer = (name) => {
    this.setState((prevState) => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: (this.prevPlayerId += 1),
          },
        ],
      };
    });
  };

  handleRemovePlayer = (id) => {
    this.setState((prevState) => {
      return {
        players: prevState.players.filter((p) => p.id !== id),
      };
    });
  };

  handleHighScore = () => {
    this.setState((prevState) => {
      const updated = [...prevState.players];
      const highScore = Math.max.apply(
        Math,
        updated.map(function (o) {
          return o.score;
        })
      );
      console.log(highScore);
      for (let i = 0; i < updated.length; i++) {
        if (updated[i].score === highScore && highScore > 0)
          updated[i].isHighScore = true;
        else if (updated[i].score <= 0 || highScore === 0) {
          updated[i].isHighScore = false;
        } else {
          updated[i].isHighScore = false;
        }
      }
      return { players: updated };
    });
  };

  render() {
    return (
      <div className="scoreboard">
        <Header players={this.state.players} />

        {/* Players list */}
        {this.state.players.map((player, index) => (
          <Player
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()}
            index={index}
            isHighScore={player.isHighScore}
            changeScore={this.handleScoreChange}
            removePlayer={this.handleRemovePlayer}
            checkScore={this.handleHighScore}
          />
        ))}

        <AddPlayerForm addPlayer={this.handleAddPlayer} />
      </div>
    );
  }
}

export default App;
