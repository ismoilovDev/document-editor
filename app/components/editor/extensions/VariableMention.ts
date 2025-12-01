import { Mention } from "@tiptap/extension-mention";

export const VariableMention = Mention.configure({
  HTMLAttributes: {
    class: "variable-mention",
  },
  suggestion: {
    char: "{{",
    allowSpaces: false,
  },
});

