export const shorten = (str, n) => {
  const countedWords = (str.match(RegExp(`.{${n}}\\S*`)) || [str])[0];
  const restWords = str.split(countedWords);
  if (restWords[1] && restWords[1].length > 0) {
    return `${countedWords}...`;
  }
  return countedWords;
};
export default { shorten };
