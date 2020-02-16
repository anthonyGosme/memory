import { expect } from "chai";
import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import GuessCount from "./GuessCount";

// jest unit test
// chai + dirty chai(pour voir les echec en cas d erreur de syntaxe)
describe("<App/>", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).to.contain(<GuessCount guesses={0} />);
  });

  it("has 36 cards", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Card')).to.have.length(36)

  });
});
