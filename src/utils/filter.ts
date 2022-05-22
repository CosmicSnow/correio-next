const forbiddenWords = [
  "mata",
  "estuprar",
  "morra",
  "puta",
  "buceta",
  "gozando",
  "gozar",
  "pack",
  "transou",
  "onlyfans",
  "penis",
  "OF",
  "piroca",
  "smt",
  "vadia",
  "foder",
  "pornografia",
  "porno",
  "xvideos",
  "matar",
  "morrer",
  "assassinar",
  "estuprada",
  "estuprado",
  "estrupada",
  "estrupado",
  "putinha",
  "viado",
  "atropelado",
  "punheta",
  "punhetaço",
  "fuder",
  "gozei",
  "safada",
  "peitos",
  "macaco",
  "vagabunda",
  "chupar",
  "pau",
  "lixo",
  "merda",
  "preto",
  "preta",
  "verme",
];

const forbiddenPhrases = [
  "te matar",
  "pau no cu",
  "filha da puta",
  "filho da puta",
  "te comer",
  "te chupar",
  "te foder",
  "te fuder",
  "fazer sexo",
  "te odeio",
];

export function filter(message: string): string {
  return badWordFilter(phrasesFilter(message));
}

export function phrasesFilter(message: string): string {
  return forbiddenPhrases.reduce((acc, phrase) => {
    return acc.replace(new RegExp(phrase, "gi"), "*bobba*");
  }, message);
}

export function badWordFilter(message: string): string {
  var words = message.split(" ");
  for (let w in words) {
    for (let f in forbiddenWords) {
      const regex = new RegExp("(" + forbiddenWords[f] + "+)", "g");
      if (regex.test(words[w].toLowerCase())) {
        words[w] = "*bobba*";
      }
    }
  }
  return words.join(" ");
}
