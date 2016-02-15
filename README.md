# markdown-replace-section

Replace a section in a Markdown file with different content.

## Installation

```sh
npm install --save markdown-replace-section
```

## Usage

Code
```javascript
import replaceSection from "markdown-replace-section";

const markdown =
`
Title
=====

New content

Other title
===========

Some other content
`;

const hungry = true; // Set to false to keep the Subtitle section
console.log(replaceSection(markdown, "Title", "New content", hungry));
```

Output

```markdown
Title
=====

New content

Other title
===========

Some other content
```

The package also comes with an executable `markdown-replace-section` for usage in shell scripts

```
Usage: src/cli.js <input_file> <heading_name> [<output_file>] [--not-hungry]

Reads the Markdown file <input_file> and replaces everything between the first
heading named <heading_name> and the next heading of the same level in the file
with the content read from stdin.

The result is written to <output_file> or stdout.


Options:
  --not-hungry  Stop at the first heading             [boolean] [default: false]
  --help, -h    Show help                                              [boolean]
  --version     Show version number                                    [boolean]

```

## License

See [LICENSE](LICENSE)
