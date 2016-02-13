/*global describe, it*/
import {expect} from "chai";

import markdownReplaceSection from "../src";

describe("markdownReplaceSection", () => {
  it("should return foo", () => {
    expect(markdownReplaceSection()).to.equal("foo");
  });
});
