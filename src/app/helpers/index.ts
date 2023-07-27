export const upperCaseState = (state: string) => {
    const palavras = state.split(" ");
    const stateUpperCase = palavras
        .map((palavra: string) => {
            if (palavra === "do") return palavra;
            if (palavra === "de") return palavra;
            return palavra[0].toUpperCase() + palavra.substring(1).toLowerCase();
        })
        .join(" ");
    return stateUpperCase;
};
