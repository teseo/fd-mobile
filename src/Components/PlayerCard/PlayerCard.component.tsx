import React from "react";

import styled from "styled-components/native";

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
  imageSource: url;
  firstName: string;
  lastName: string;
  isWinner: boolean;
  handlePress: () => void;
};
export default class PlayerCard extends React.Component<MyProps, {}> {

  render() {
    const name = this.props.firstName + ' ' + this.props.lastName;
    return (
      <PlayerCardContainer>
        <PlayerDataContainer onPress={this.props.handlePress}>
          <PlayerImage
            source={this.props.imageSource}
          />
          <TextName>Name: {name}</TextName>
          <TextName>Winner: {this.props.isWinner ? "true": "false"}</TextName>

        </PlayerDataContainer>
      </PlayerCardContainer>
    );

  }
}
