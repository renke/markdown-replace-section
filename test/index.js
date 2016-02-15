/*global describe, it*/
import {expect} from "chai";

import replaceSection from "../src";

describe("replaceSection", () => {
  it("single setext heading", () => {
    const document =
`H1\n==\nfoo`;

    expect(replaceSection(document, "H1", "bar")).to.equal(
`H1\n==\n\nbar\n`
    );
  });

  it("single setext heading, new lines", () => {
    const document =
`H1\n==\n\nfoo\n`;

    expect(replaceSection(document, "H1", "bar")).to.equal(
`H1\n==\n\nbar\n`
    );
  });

  it("single setext heading, more new lines", () => {
    const document =
`H1\n==\n\nfoo\n`;

    expect(replaceSection(document, "H1", "bar")).to.equal(
`H1\n==\n\nbar\n`
    );
  });

  it("single heading", () => {
    const document =
`# H1\nfoo`;

    expect(replaceSection(document, "H1", "bar")).to.equal(
`# H1\n\nbar\n`
    );
  });

  it("two headings", () => {
    const document =
`# H1\nfoo\n# H2\nbaz`;

    expect(replaceSection(document, "H1", "bar")).to.equal(
`# H1\n\nbar\n\n# H2\nbaz`
    );
  });

  it("two heading, two sub-headings, stop 1", () => {
    const document =
`# H1\nfoo\n## H1.1\nbaz\n## H1.2\n# H2\nbaz`;

    expect(replaceSection(document, "H1", "bar")).to.equal(
`# H1\n\nbar\n\n# H2\nbaz`
    );
  });

  it("two headings, two subheading, not-hungry", () => {
    const document =
`# H1\nfoo\n## H1.1\nbaz\n## H1.2\n# H2\nbaz`;

    expect(replaceSection(document, "H1", "bar", false)).to.equal(
`# H1\n\nbar\n\n## H1.1\nbaz\n## H1.2\n# H2\nbaz`
    );
  });

  it("one headings, one subheading, no content, not-hungry", () => {
    const document =
`# H1\n## H2`;

    expect(replaceSection(document, "H1", "bar", false)).to.equal(
`# H1\n\nbar\n\n## H2`
    );
  });
});
