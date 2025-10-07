module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type enum - only these types are allowed
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore"],
    ],
    // Type must be lowercase
    "type-case": [2, "always", "lower-case"],
    // Type is required
    "type-empty": [2, "never"],
    // Scope is optional but must be lowercase if provided
    "scope-case": [2, "always", "lower-case"],
    // Subject is required
    "subject-empty": [2, "never"],
    // Subject must not end with period
    "subject-full-stop": [2, "never", "."],
    // Subject max length is 50 chars
    "subject-max-length": [2, "always", 50],
    // Subject must be in imperative mood (lowercase first letter)
    "subject-case": [2, "always", "lower-case"],
    // Header (type + scope + subject) max length
    "header-max-length": [2, "always", 72],
    // Body max line length is 72 chars
    "body-max-line-length": [2, "always", 72],
    // Body must have blank line before it
    "body-leading-blank": [2, "always"],
    // Footer must have blank line before it
    "footer-leading-blank": [2, "always"],
  },
  // Custom help message
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
  prompt: {
    messages: {
      skip: ": press enter to skip",
      max: "upper %d chars",
      min: "%d chars at least",
      emptyWarning: "can not be empty",
      upperLimitWarning: "over limit",
      lowerLimitWarning: "below limit",
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: "A new feature",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "Documentation only changes",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description:
              "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description:
              "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "📦",
          },
          perf: {
            description: "A code change that improves performance",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🚨",
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "♻️",
          },
        },
      },
      scope: {
        description:
          "What is the scope of this change (e.g. component, service, api)?",
      },
      subject: {
        description:
          "Write a short, imperative tense description of the change (max 50 chars)",
      },
      body: {
        description: "Provide a longer description of the change (optional)",
      },
      footer: {
        description:
          "List any breaking changes or issues closed by this change (optional)",
      },
    },
  },
};
