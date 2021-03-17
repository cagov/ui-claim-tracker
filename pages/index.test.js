//import MyApp from "./_app";
//import React from "react";
//import { shallow } from "enzyme";
//
//describe("<MyApp />", () => {
//  it("renders application", () => {
//    const wrapper = shallow(<MyApp />);
//
//    expect(wrapper).toMatchSnapshot();
//  });
//});

import React from 'react'
import renderer from 'react-test-renderer'
import Index from '../pages/index'

it('renders homepage unchanged', () => {
  const tree = renderer.create(<Index />).toJSON()
  expect(tree).toMatchSnapshot()
})
