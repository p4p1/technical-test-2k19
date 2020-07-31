const fetch = require("node-fetch");
const fs = require('fs');
const path = require('path')
const base64 = require("base-64");

require('dotenv').config({ path: path.resolve(__dirname, '/.env') })
const apikeyTts = process.env.IBM_APIKEY_TTS; // IBM SECRET KEY FOR THE API text to speech
const apikeyStt = process.env.IBM_APIKEY_STT; // IBM SECRET KEY FOR THE API speech to text

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
        'Authorization': 'Basic ' + base64.encode('apikey:' + apikeyTts)
      },
      body: JSON.stringify({
        voice: voice_data,
        text: text_data
      })
    });

    // Download the file to a file stream
    await new Promise((resolve, reject) => {
      stream.body.pipe(fp);
      stream.body.on("error", (err) => {
        reject(err);
      });
      fp.on("finish", function () {
        resolve();
      });
    });
  }),
  speechText: (voice_data) => {
    const path = process.env.FILE_NAME;
    const speech_to_text_url = "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/b127c523-e546-4879-829c-0182171c0214";
    var fp = fs.createReadStream(path);
    //var fp_size = fs.statSync(path).size;

    // upload the file :
    return fetch(`${speech_to_text_url}/v1/recognize?max_alternatives=1&model=${voice_data}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'audio/wav',
        'Authorization': 'Basic ' + base64.encode('apikey:' + apikeyStt)
      },
      body: fp
    }).then((resp) => resp.json()).then((respJson) => {
      return respJson;
    }).catch((err) => console.error(err));
  },
  algorithm: (start_text, end_text, points) => {
    var ori = start_text.trim().split(" ");
    var final = end_text.trim().split(" ");
    var result = 0;

    // do an average of all of the confidence levels
    for (var i = 0; i < points.length; i++) {
      result += points[i];
    }
    result /= points.length;
    // take the confidence level of the api and remove 2pts per word error :)
    // add 5pts per correct word in right position
    for (var i = 0; i < ori.length && i < final.length; i++) {
      if (ori[i] == final[i]) {
        result += 5;
      } else {
        result -= 2;
      }
    }
    return result;
  }
};
