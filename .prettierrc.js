module.exports = {
  // Line width before wrapping
  printWidth: 80,

  // Use 2 spaces for indentation
  tabWidth: 2,
  useTabs: false,

  // Use semicolons at the end of statements
  semi: true,

  // Use single quotes instead of double quotes
  singleQuote: false,

  // Quote properties in objects only when necessary
  quoteProps: "as-needed",

  // Use single quotes in JSX
  jsxSingleQuote: false,

  // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  trailingComma: "es5",

  // Print spaces between brackets in object literals
  bracketSpacing: true,

  // Put the > of a multi-line JSX element at the end of the last line
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter
  arrowParens: "always",

  // Format only files that have a pragma comment at the top
  requirePragma: false,

  // Add a pragma comment to the top of formatted files
  insertPragma: false,

  // Wrap prose if it exceeds the print width
  proseWrap: "preserve",

  // Respect whitespace in HTML
  htmlWhitespaceSensitivity: "css",

  // Use LF line endings
  endOfLine: "lf",

  // Format embedded code (e.g. Markdown code blocks)
  embeddedLanguageFormatting: "auto",

  // Enforce single attribute per line in JSX
  singleAttributePerLine: false,

  // Plugin-specific settings
  plugins: [],

  // File-specific overrides
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 120,
      },
    },
    {
      files: "*.md",
      options: {
        proseWrap: "always",
      },
    },
  ],
};
