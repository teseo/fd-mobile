import React from "react";

import styled from "styled-components/native";
import CounterPanel from "../CounterPanel";
import PlayerCard from "../PlayerCard";
import {FAILED_GUESS, MAX_SCORE, PENDING_GUESS, SUCCESSFUL_GUESS} from "../../constants";
import ApiService from "../../utils";

const GameContainer = styled.ScrollView`
  padding: 20px;
  background-color: lightpink;
  flex-direction: column;
 
`;

const HeaderContainer = styled.View`
  align-items: center;
  margin: 0 5px 5px 0;
  background-color: greenyellow;
  height: 100px;
  justify-content: center;  
  border-radius: 16px;
`;
const HeaderText = styled.Text`
  margin-top: 5px;
  font-size: 18px;
  height: 43px;
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

const RestartButtonContainer = styled.View`
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
  border-radius: 12px;
  padding: 5px;
  margin-bottom: 5px;
`;

const BottomText = styled.Text`
margin-bottom: 5px;
`;
const ButtonText = styled.Text``;

type MyState = {
  score: number;
  players: Array<Player>;
  playersRaw: Array<Player>;
  showResult: boolean;
  guessRight: number;
  gameOver: boolean;
};
type DefaultImageData = {
  height: number;
  url: string;
  width: number;
}
type ImageData = {
  default: DefaultImageData
};

type Player = {
  first_name: string;
  last_name: string;
  fppg: number;
  images: ImageData
}
export default class Game extends React.Component<{}, MyState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      score: 0,
      showResult: false,
      gameOver: false,
      players: [],
      playersRaw: [],
      guessRight: PENDING_GUESS
    };
  }

  componentDidMount(): void {
    this.loadPlayers();
  }

  loadPlayers = async (): Promise<void> => {
    if (this.state.playersRaw.length === 0) {
      const players = await ApiService.getPlayers();
      this.setState({
        ...this.state,
        players: players,
        playersRaw: players
      });
    }

  };

  handelPlayerPress(playersToPlay: Array<Player>, playerOne: Player, playerTwo: Player, isWinner: Boolean): void {
    if (this.state.guessRight == PENDING_GUESS) {
      this.setState({
        showResult: true,
        guessRight: isWinner ? SUCCESSFUL_GUESS : FAILED_GUESS
      });
    }
  }

  handleContinuePress(playersToPlay: Array<Player>) {
    let score = this.state.guessRight == SUCCESSFUL_GUESS ? this.state.score + 1 : this.state.score;
    this.setState({
      ...this.state,
      score: score,
      gameOver: score === MAX_SCORE,
      showResult: false,
      players: playersToPlay,
      guessRight: PENDING_GUESS
    });
  }

  handleRestartGamePress() {

    this.setState({
      score: 0,
      showResult: false,
      players: this.state.playersRaw,
      gameOver: false,
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

          {score < MAX_SCORE && playerOne && playerTwo && <PlayerCard
              firstName={playerOne.first_name}
              lastName={playerOne.last_name}
              imageSource={{uri: playerOne.images.default.url}}
              isWinner={playerOne.fppg > playerTwo.fppg}
              ffpg={playerOne.fppg}
              showResult={this.state.showResult}
              guessRight={this.state.guessRight}
              handelPlayerPress={() => this.handelPlayerPress(playersToPlay, playerOne, playerTwo, playerOne.fppg > playerTwo.fppg)}
          />}
          {score < MAX_SCORE && playerOne && playerTwo && <PlayerCard
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
            <BottomText>{this.state.guessRight === SUCCESSFUL_GUESS ? "Well done! " : "You missed this one!"}</BottomText>
            <ContinueButtonContainer onPress={() => this.handleContinuePress(playersToPlay)}>
                <ButtonText>Continue</ButtonText>
            </ContinueButtonContainer>
        </BottomContainer>
        }
        {this.state.gameOver
        &&
        <RestartButtonContainer>
            <ContinueButtonContainer onPress={() => this.handleRestartGamePress()}>
                <ButtonText>Restart Game</ButtonText>
            </ContinueButtonContainer>
        </RestartButtonContainer>
        }
      </GameContainer>
    );

  }
}
