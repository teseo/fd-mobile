import React from "react";

import styled from "styled-components/native";
import CounterPanel from "../CounterPanel";
import PlayerCard from "../PlayerCard";
import players from "./Data/players";

const MAX_SCORE = 10;
const SUCCESSFUL_GUESS = 1;
const FAILED_GUESS = 2;
const PENDING_GUESS = 3;

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
  font-size: 18px;
  height: 44px;
`;

const PlayersCardContainer = styled.View`
  flex-direction: row;
  background-color: coral;
  justify-content: space-evenly;
`;
const BottomContainer = styled.View`
  flex-direction: column;
  background-color: coral;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;


const ContinueButtonContainer = styled.TouchableOpacity`
  background-color: yellow;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12;
  padding: 5px;
  margin-bottom: 5px;
`;

const BottomText = styled.Text`
margin-bottom: 5px;
`;
const ButtonText = styled.Text``;

type MyState = {
  score: number;
  players: array;
  showResult: boolean;
  guessRight: number;
};
export default class Game extends React.Component<{}, MyState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      score: 0,
      showResult: false,
      players: players,
      guessRight: PENDING_GUESS
    };
  }

  handelPlayerPress(playersToPlay: array, playerOne: object, playerTwo: object, isWinner: bool): void {

    this.setState({
      //...this.state,
      showResult: true,
      guessRight: isWinner ? SUCCESSFUL_GUESS : FAILED_GUESS
    });

  }

  handleContinuePress(playersToPlay: array) {

    this.setState({
      ...this.state,
      score: this.state.guessRight == SUCCESSFUL_GUESS ? this.state.score + 1 : this.state.score,
      showResult: false,
      players: playersToPlay,
      guessRight: PENDING_GUESS
    });


  }

  render() {

    let playersToPlay = this.state.players.slice();
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
              ffpg={playerOne.fppg}
              showResult={this.state.showResult}
              guessRight={this.state.guessRight}
              handelPlayerPress={() => this.handelPlayerPress(playersToPlay, playerOne, playerTwo, playerOne.fppg > playerTwo.fppg)}
          />}
          {score < MAX_SCORE && (playerOne && playerTwo) && <PlayerCard
              firstName={playerTwo.first_name}
              lastName={playerTwo.last_name}
              imageSource={{uri: playerTwo.images.default.url}}
              isWinner={playerTwo.fppg > playerOne.fppg}
              ffpg={playerTwo.fppg}
              showResult={this.state.showResult}
              guessRight={this.state.guessRight}
              handelPlayerPress={() => this.handelPlayerPress(playersToPlay, playerOne, playerTwo, playerTwo.fppg > playerOne.fppg)}

          />}
          {!playerOne || !playerTwo &&
            <HeaderText>You lost 😰 </HeaderText>
          }
          {score == MAX_SCORE &&
            <HeaderText>You're a pro 😎! </HeaderText>
          }
        </PlayersCardContainer>
        {this.state.guessRight != PENDING_GUESS
          &&
          <BottomContainer>
              <BottomText>{this.state.guessRight === SUCCESSFUL_GUESS ? "You won! " : "You lost"}</BottomText>
              <ContinueButtonContainer onPress={() => this.handleContinuePress(playersToPlay)}>
                  <ButtonText>Continue</ButtonText>
              </ContinueButtonContainer>
          </BottomContainer>
        }
      </GameContainer>
    );

  }
}
