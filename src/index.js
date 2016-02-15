import Remark from "remark";

export default function replaceSection(document, headingName, content, hungry=true) {
  const remark = Remark();

  const node = remark.parse(document);

  const heading = findHeading(document, node, headingName);

  const {start, end} = findSectionRange(node, heading, hungry);

  return replaceRange(document, node, {start, end}, content);
}

function replaceRange(document, node, {start, end}, content) {
  const before = document.slice(0, start);
  const after = document.slice(end);

  if (after === "") {
    return `${before}\n\n${content}\n`;
  }

  return `${before}\n\n${content}\n\n${after}`;
}

function findSectionRange(node, heading, hungry=true) {
  const headingIndex = node.children.indexOf(heading);

  const sectionStart = heading.position.end.offset;
  let sectionEnd;

  for (const sibling of node.children.slice(headingIndex + 1)) {
    if (sibling.type === "heading") {
      if (!hungry || sibling.depth === heading.depth) {
        sectionEnd = sibling.position.start.offset;
        break;
      }
    } else {
      sectionEnd = sibling.position.end.offset + 1;
    }
  }

  return {start: sectionStart, end: sectionEnd};
}

function findHeading(document, node, name) {
  for (const child of node.children) {
    const {type} = child;

    if (type === "heading")  {
      const content = getContent(document, child);

      if (content === name) {
        return child;
      }
    }
  }
}

function getContent(document, child) {
  let contentRange;

  if (child.children.length === 1) {
    const position = child.children[0].position;
    contentRange = {start: position.start.offset, end: position.end.offset};
  } else {
    const firstPosition = child.children[0].position;
    const lastPosition = child.children[child.children.length - 1].position;
    contentRange = {start: firstPosition.start.offset, end: lastPosition.end.offset};
  }

  const {start, end} = contentRange;
  return document.slice(start, end);
}
