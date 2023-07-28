export const upperCaseState = (state: string) => {
  if (!state) return;
  const words = state.split(" ");
  const stateUpperCase = words
    .map((word: string) => {
      if (word === "do" || word === "de") return word;      
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
  return stateUpperCase;
};
