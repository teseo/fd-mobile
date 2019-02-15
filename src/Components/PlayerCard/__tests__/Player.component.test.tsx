/**
 * @format
 */

import 'react-native';
import React from 'react';
import PlayerCard from '../PlayerCard.component';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { mount } from "enzyme";


describe("<PlayerCard />", () => {
  // it("it renders placeholder when teamType is PLACEHOLDER", () => {
  //   const wrapper = mount(mockTheme(<TeamLogo team={{ typeTeam: "PLACEHOLDER", displayName: "A" }} size={40} />));
  //   expect(
  //     wrapper
  //       .find("TeamLogo__PlaceholderTeam")
  //       .first()
  //       .exists()
  //   ).toEqual(true);
  // });
  // it("It doesn't render a placeholder when teamType is not PLACEHOLDER", () => {
  //   const wrapper = mount(mockTheme(<TeamLogo team={{ typeTeam: "X", displayName: "A", id: 1 }} size={40} />));
  //   expect(
  //     wrapper
  //       .find("TeamLogo__PlaceHolderTeam")
  //       .first()
  //       .exists()
  //   ).toEqual(false);
  // });
  it('renders correctly', () => {
    const handelPlayerPress = jest.fn();
    const wrapper = mount(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      isWinner={true}
      ffpg={23}
      showResult={true}
      guessRight={3}
      handelPlayerPress={handelPlayerPress}
    />);
    expect(
      wrapper
        .find("PlayerCard__PlayerCardContainer")
        .first()
        .exists()
    ).toEqual(true);
  });
});
