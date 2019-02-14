import React from "react";

import styled from "styled-components/native";
import CounterPanel from "../CounterPanel";
import PlayerCard from "../PlayerCard";
import players from "./Data/players";

const MAX_SCORE = 10;
const GameContainer = styled.ScrollView`
  padding: 20px;
  background-color: lightpink;
  flex-direction: column;
 
`;

const HeaderContainer = styled.View`
  align-items: center;
  margin: 5px 10px 5px 10px;
  background-color: greenyellow;
  height: 100;
  justify-content: center;  
  border-radius: 16;
`;
const HeaderText = styled.Text`
  font-size: 18;
  height: 44;
`;

const PlayersCardContainer = styled.View`
  flex-direction: row;
  background-color: coral;
  justify-content: space-evenly;
`;

type MyState = {
  score: number;
  players: array;
  scoredPlayers: array;

};
export default class Game extends React.Component<{}, MyState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      score: 0,
      players: players,
      scoredPlayers: []
    };
  }

  handlePress(playersToPlay: array, playerOne: object, playerTwo: object, isWinner: bool): void {

    this.setState({
      ...this.state,
      score: isWinner ? this.state.score + 1 : this.state.score,
      scoredPlayers: [...this.state.scoredPlayers, playerOne, playerTwo],
      players: playersToPlay
    });
  }

  render() {

    let playersToPlay = this.state.players;
    const score = this.state.score;
    const playerOne = playersToPlay.shift();
    const playerTwo = playersToPlay.shift();
    return (
      <GameContainer>
        <HeaderContainer>
          <HeaderText>Select the player with the higher FanDuel Points Per Game (FPPG). </HeaderText>
        </HeaderContainer>
        <CounterPanel score={this.state.score}/>
        <PlayersCardContainer>

          {score < MAX_SCORE && (playerOne && playerTwo) && <PlayerCard
              firstName={playerOne.first_name}
              lastName={playerOne.last_name}
              imageSource={{uri: playerOne.images.default.url}}
              isWinner={playerOne.fppg > playerTwo.fppg}
              handlePress={() => this.handlePress(playersToPlay, playerOne, playerTwo, playerOne.fppg > playerTwo.fppg)}
          />}
          {score < MAX_SCORE && (playerOne && playerTwo) && <PlayerCard
              firstName={playerTwo.first_name}
              lastName={playerTwo.last_name}
              imageSource={{uri: playerTwo.images.default.url}}
              isWinner={playerTwo.fppg > playerOne.fppg}
              handlePress={() => this.handlePress(playersToPlay, playerOne, playerTwo, playerTwo.fppg > playerOne.fppg)}

          />}
          {!playerOne || !playerTwo &&
          <HeaderText>You lost 😰 </HeaderText>
          }
          {score == MAX_SCORE &&
          <HeaderText>You're a pro
              😎! {console.log(this.state.players)}{console.log(this.state.scoredPlayers)}</HeaderText>
          }
        </PlayersCardContainer>
      </GameContainer>
    );

  }
}
