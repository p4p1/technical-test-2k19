const fetch = require("node-fetch");
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '/.env') })
const apikey = process.env.IBM_APIKEY; // IBM SECRET KEY FOR THE API

module.exports = {
  textSpeech: (text) => {
    return text;
  },
  speechText: (fp) => {
    return "lol";
  }
};
