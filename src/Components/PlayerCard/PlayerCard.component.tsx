import React from "react";

import styled from "styled-components/native";

const SUCCESSFUL_GUESS = 1;
const FAILED_GUESS = 2;
const PENDING_GUESS = 3;

const PlayerCardContainer = styled.TouchableOpacity`
  background-color: forestgreen;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
    margin: 5px 10px 5px 10px;

`;
const PlayerDataContainer = styled.TouchableOpacity`
  background-color: paleturquoise;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TextName = styled.Text``;
const PlayerImage = styled.Image`
  width: 150px;
  height: 150px;
`;

type MyProps = {
  imageSource: any;
  firstName: string;
  lastName: string;
  isWinner: boolean;
  ffpg: number;
  handelPlayerPress: () => void;
  showResult: boolean;
  guessRight: number;
};
export default class PlayerCard extends React.Component<MyProps, {}> {

  render() {
    const name = this.props.firstName + ' ' + this.props.lastName;
    const showResult = this.props.showResult;
    const guessRight = this.props.guessRight;
    const ffpg = this.props.ffpg;
    return (
      <PlayerCardContainer>
        <PlayerDataContainer onPress={this.props.handelPlayerPress}>
          <PlayerImage
            source={this.props.imageSource}
          />
          <TextName>Name: {name}</TextName>
          {showResult
          && ffpg &&
          <TextName>FFPG: {ffpg.toPrecision(10)}</TextName>
          }


        </PlayerDataContainer>
      </PlayerCardContainer>
    );

  }
}
