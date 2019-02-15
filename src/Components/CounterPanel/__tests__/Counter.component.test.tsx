/**
 * @format
 */
import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import CounterPanel from '../CounterPanel.component';
import {mount, shallow} from "enzyme";


describe("<CounterPanel />", () => {
  it('Renders Counter panel correctly', () => {
    const wrapper = shallow(<CounterPanel score={5}/>).dive();
    expect(wrapper.find("Styled(Text)").first().props()).toEqual({"children": 1, "inputColor": "black"});
    expect(wrapper.find("Styled(Text)").at(5).props()).toEqual({"children": 6, "inputColor": "grey"});
  });



});
