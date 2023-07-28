export const upperCaseState = (state: string) => {
  if (!state) return;
  const words = state.split(" ");
  const stateUpperCase = words
    .map((word: string) => {
      if (word.length === 2) return word.toLowerCase();      
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
  return stateUpperCase;
};
