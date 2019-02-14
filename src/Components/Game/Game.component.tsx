import React from "react";

import styled from "styled-components/native";
import CounterPanel from "../CounterPanel";
import PlayerCard from "../PlayerCard";

const GameContainer = styled.View`
  padding: 20px;
  background-color: lightpink;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const TextSample = styled.Text``;

export default class Game extends React.Component<{}, {}> {

  render() {
    return (
      <GameContainer>
        <TextSample> I'm a game component</TextSample>
        <CounterPanel/>
        <PlayerCard/>
      </GameContainer>
    );

  }
}
