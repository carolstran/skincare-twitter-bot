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

const postTweet = () => {
  return bot.post(
    "statuses/update",
    {
      status: generateTweetText()
    },
    (err, data, response) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(`${data.text} tweeted!`);
      }
    }
  );
};

// Tweets every 12 hours
setInterval(postTweet, 1000 * 60 * 60 * 12);
