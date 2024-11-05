import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

it("renders Card component without crashing", () => {
  render(<Card caption="Test caption" src="test.jpg" currNum={1} totalNum={3} />);
});
