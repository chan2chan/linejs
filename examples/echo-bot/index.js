'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'UymbUV9vT9UItuFsQdHuDlFug3gI/JayqcDDgwsrkyjvJSkdMAQ0SAnhOuu7kc2ysvO5ucU1mFUpfxg51AuSpso1PoaK0bDKLNCSGO2PeM6fq69SZ8zDwR/Krako/BsDoaAvvV+manIriQQddlHfkgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'a46ba5bc771ed42c42dc18f2b5750c1b',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
