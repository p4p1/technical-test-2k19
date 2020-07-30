#!/bin/bash
# test.sh
# Created on: Thu 30 Jul 2020 03:54:13 AM CEST
#
#  ____   __  ____  __
# (  _ \ /. |(  _ \/  )
#  )___/(_  _))___/ )(
# (__)    (_)(__)  (__)
#
# Description:

curl -X POST -u "apikey:4RQ9IGzbHH04YHhJO6LjMFvK9f33bSIDtHAPnyYOLMwJ" --header "Content-Type: application/json" --header "Accept: audio/wav" --data "{\"text\":\"Hello World!\"}" --output hello_world.wav "https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/a138a120-1b00-48c5-9635-29a10d13b2be/v1/synthesize"
curl -X POST -u "apikey:JRgniogsfQFpT5aNFc3ZGXnMSLjK21qhXpww3op4AnX-" --header "Content-Type: audio/wav" --data-binary "@/home/p4p1/Documents/technical-test-2k19/wav_test/hello_world.wav" "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/b127c523-e546-4879-829c-0182171c0214/v1/recognize"

