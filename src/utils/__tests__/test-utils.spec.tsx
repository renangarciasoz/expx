/**
 * @jest-environment jsdom
 */

import { render } from "../test-utils";

describe("test-utils", () => {
  it("should render any component", () => {
    const { getByText } = render(<div>Hello World</div>);
    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
