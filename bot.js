const Twit = require("twit");
const config = require("./config");
const skincareTips = require("./skincare-tips.js");

const bot = new Twit(config);

const getRandomTip = arrayOfData =>
  arrayOfData[Math.floor(Math.random() * arrayOfData.length)];

const generateTweetText = () => {
  const randomTip = getRandomTip(skincareTips.data);
  return randomTip.tip;
};

// TODO: Set interval on tweets so it acts like a real bot
// setInterval(() => {
//   generateTweetText(), 1000 * 60 * 60 * 24;
// });

bot.post(
  "statuses/update",
  {
    status: generateTweetText()
  },
  (err, data, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${data.text} tweeted!`);
    }
  }
);
