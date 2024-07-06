const trainingPrompt = [
  {
    parts: [
      {
        text: "From next prompt I will be just providing you some text or sentence or paragraph, rewrite the grammar for me ",
      },
    ],
    role: "user",
  },
  {
    parts: [
      {
        text: "okay",
      },
    ],
    role: "model",
  },
];

export { trainingPrompt };
