const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const boa = require("../lib/boa.js");
const db = require("../lib/db.js");
const middleware = require("../middleware/middleware.js");

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

const SECRETKEY = process.env.SECRETKEY; // md5 hash of Leo Smith
const apikey = process.env.IBM_APIKEY; // IBM SECRET KEY FOR THE API

router.post("/login", (req, res, next) => {
  // query to get username
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!"
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // error from bcrypt
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Username or password is incorrect!"
            });
          }
          // Correct password
          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].username,
              },
              SECRETKEY,
              {
                expiresIn: "7d"
              }
            );
            return res.status(200).send({
              msg: "Logged in!",
              token
            });
          }
          // no result so incorrect password
          return res.status(401).send({
            msg: "Username or password is incorrect!"
          });
        }
      );
    }
  );
});

router.post("/register", middleware.validateRegister, (req, res, next) => {
  // query to see if use exists
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      // result.length should be null if there is no username match
      if (result.length) {
        return res.status(409).send({
          msg: "This username is already in use!"
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            // bcrypt didnt hash the password
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users(username, password) values(${db.escape(
                req.body.username
              )}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: "Registered!"
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/boa", middleware.isLoggedIn, (async (req, res) => {
  /*     language:              french              portugueses  *
   *     chinese              english                  arabic    */
  var languages_spoken = [ 'fr-FR_ReneeVoice', 'pt-BR_IsabelaVoice',
    'zh-CN_LiNaVoice', 'en-GB_CharlotteV3Voice', 'ar-AR_OmarVoice' ]
  var listening_language = [ 'fr-FR_BroadbandModel', 'pt-BR_BroadbandModel',
    'zh-CN_BroadbandModel', 'en-GB_BroadbandModel', 'ar-AR_BroadbandModel' ]
  var points = [];
  var result = 0;
  var turns = [];

  if (req.body.turns == undefined || req.body.text == undefined) {
    return (res.status(400).send({
      data: "Error: params not found"
    }));
  }
  if (req.body.turns <= 0 || !req.body.text.length) { // If no turns provided OR no text
    return (res.status(200).send({
      data: "Error: number of tries has to be supperior to 0 and text should be sent"
    }));
  }
  // pick a random language
  var pos = Math.floor(Math.random() * Math.floor(languages_spoken.length - 1)) + 1;
  var data = await boa.textSpeech(req.body.text, languages_spoken[pos]);
    turns.push(languages_spoken[pos]);

  // loop through the number of turns
  for (var i = 0; i < (req.body.turns - 1); i++) {
    pos = Math.floor(Math.random() * Math.floor(languages_spoken.length - 1)) + 1;
    data = await boa.speechText(listening_language[0]);
    await boa.textSpeech(req.body.text, languages_spoken[pos]);
    points.push(data.results[0].alternatives[0].confidence * 100);
    turns.push(languages_spoken[pos]);
  }
  data = await boa.speechText(listening_language[0]);
  points.push(data.results[0].alternatives[0].confidence * 100);
  result = boa.algorithm(req.body.text,
    data.results[0].alternatives[0].transcript, points);

  return (res.status(201).send({
    text: data.results[0].alternatives[0].transcript,
    result: result,
    turns: turns
  }));
}));

module.exports = router;
