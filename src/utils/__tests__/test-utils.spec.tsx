/**
 * @jest-environment jsdom
 */

import {
  clearWindowMatchMedia,
  mockWindowMatchMedia,
} from "@fixtures/window-match-media.mock";
import { render } from "../test-utils";

describe("test-utils", () => {
  beforeAll(() => {
    mockWindowMatchMedia();
  });

  afterAll(() => {
    clearWindowMatchMedia();
  });

  it("should render any component", () => {
    mockWindowMatchMedia();
    const { getByText } = render(<div>Hello World</div>);
    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
