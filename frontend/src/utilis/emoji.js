export function getRandomEmojis() {
  const emojis = [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "😋",
    "😎",
    "😍",
    "😘",
    "😗",
    "😙",
    "😚",
    "😇",
    "🥰",
    "😐",
    "😑",
    "😶",
    "🙄",
    "😏",
    "😣",
    "😥",
    "😮",
    "😯",
    "😲",
    "😴",
    "😌",
    "😛",
    "😜",
    "🤓",
    "😝",
    "🤑",
    "😞",
    "😔",
    "😕",
    "🙁",
    "😟",
    "😮‍💨",
    "😤",
    "😢",
    "😥",
    "😩",
    "😫",
    "😭",
    "😱",
    "😨",
    "😰",
    "😳",
    "🤯",
    "😵",
    "😵‍💫",
    "🤠",
    "🥳",
    "😈",
    "👿",
    "👻",
    "💀",
    "☠️",
    "👽",
    "💩",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
  ];

  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

// Example usage
// const randomEmojis = getRandomEmojis();
// console.log(randomEmojis);