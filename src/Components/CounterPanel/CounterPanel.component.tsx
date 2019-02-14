import React from "react";

import styled from "styled-components/native";
const CounterText = styled.Text`
  color:${props => props.inputColor};
`;

const CounterPanelContainer = styled.View`
  background-color: aqua;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

`;
type MyProps = {
  score: number;
};
export default class CounterPanel extends React.Component<MyProps, {}> {
  render() {
    let counterScore = [];

    for (let i = 1; i <= 10; i++) {

      counterScore.push(
        // @ts-ignore
        <CounterText key={i} inputColor={i <= this.props.score ? "black" : "grey"}>{i}</CounterText>
      )
    }
    return (
      <CounterPanelContainer>
        {counterScore}
      </CounterPanelContainer>
    );

  }
}
