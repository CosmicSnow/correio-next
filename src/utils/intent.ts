export function intent(text: string, username: string): string {
  const final = `via https://correioanonimo.com.br/${username}`;

  var intentLength = 200 - final.length;

  const textWords = text.split(" ");
  let sentence = textWords.reduce((acc, word) => {
    if (acc.length + word.length + 1 > intentLength) {
      return acc;
    }

    return acc + " " + word;
  });

  return encodeURIComponent(
    `"${sentence === text ? sentence : sentence + "..."}" ${final}`
  );
}
