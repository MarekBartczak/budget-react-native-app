import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Text, View, TouchableOpacity } from "react-native";
import { cleanup } from "@testing-library/react-native";
import ItemListToAdd from "./itemListToAdd";

configure({ adapter: new Adapter() });
afterEach(cleanup);

describe("<ItemListToAdd/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ItemListToAdd />);
  });
  it("should render <Text></Text> item wrapped in <TouchableOpacity/> ", () => {
    expect(wrapper.find(Text)).toHaveLength(1);
  });
  it("should render <View></View>  ", () => {
    expect(wrapper.find(View)).toHaveLength(3);
  });
  it("should render <TouchableOpacity></TouchableOpacity> item wrapped in <View/> ", () => {
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
  });
});
