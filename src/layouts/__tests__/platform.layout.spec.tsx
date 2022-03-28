/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "utils/test-utils";
import { PlatformLayout } from "../platform.layout";

describe("platform layout", () => {
  it("renders correctly", () => {
    const { asFragment, getByText } = render(
      <PlatformLayout>
        <div>Hello World</div>
      </PlatformLayout>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
