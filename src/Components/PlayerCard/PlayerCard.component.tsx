import React from "react";

import styled from "styled-components/native";

const PlayerCardContainer = styled.View`
  padding: 20px;
  background-color: forestgreen;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const TextSample = styled.Text``;

export default class PlayerCard extends React.Component<{}, {}> {

  render() {
    return (
      <PlayerCardContainer>
        <TextSample>I'm a player component</TextSample>
      </PlayerCardContainer>
    );

  }
}
