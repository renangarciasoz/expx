import { render } from "utils/test-utils";
import HomePage from "../index";

describe("Home page", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
