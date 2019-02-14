import React from "react";

import styled from "styled-components/native";

const CounterPanelContainer = styled.View`
  padding: 20px;
  background-color: mediumvioletred;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const TextSample = styled.Text``;

export default class CounterPanel extends React.Component<{}, {}> {

  render() {
    return (
      <CounterPanelContainer>
        <TextSample>Hello I'm the counter panel</TextSample>
      </CounterPanelContainer>
    );

  }
}
