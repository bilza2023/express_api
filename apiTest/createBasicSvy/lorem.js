

const lorem = (numWords) => {
  const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
  let result = '';
  for (let i = 0; i < numWords; i++) {
    result += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return result.trim();
}

module.exports = lorem;