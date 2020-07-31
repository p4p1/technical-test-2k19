const fetch = require("node-fetch");
const fs = require('fs');
const path = require('path')
const base64 = require("base-64");

require('dotenv').config({ path: path.resolve(__dirname, '/.env') })
const apikey = process.env.IBM_APIKEY; // IBM SECRET KEY FOR THE API

module.exports = {
  textSpeech: (async (text_data, voice_data) => {
    const path = process.env.FILE_NAME;
    const text_to_speech_url = "https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/a138a120-1b00-48c5-9635-29a10d13b2be";
    const fp = fs.createWriteStream(path);

    // Request for the file
    var stream = await fetch(`${text_to_speech_url}/v1/synthesize`, {
      method: 'POST',
      headers: {
        Accept: 'audio/wav',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode('apikey:' + apikey)
      },
      body: JSON.stringify({
        voice: voice_data,
        text: text_data
      })
    });

    console.log(stream);

    // Download the file to a file stream
    await new Promise((resolve, reject) => {
      stream.body.pipe(fp);
      stream.body.on("error", (err) => {
        reject(err);
      });
      fp.on("finish", function () {
        console.log("finished download of :", path);
        resolve();
      });
    });

    return fp;
  }),
  speechText: (async () => {
    const path = process.env.FILE_NAME;
    return "lol";
  })
};
