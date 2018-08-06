const { Router } = require('express')
const router = Router()
const line = require('@line/bot-sdk')

// create LINE SDK client
const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
})

// register a webhook handler with middleware
// about the middleware, please refer to doc
router.post('/lineBot', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
})

// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

// callback function to handle a single event
function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken, event.source);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken, source) {
  switch (message.text) {
    case '新增清單':
      client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: '新增清單',
          template: {
            type: 'buttons',
            text: '選擇何種新增方式呢？',
            actions: [
              { label: '發票', type: 'postback', data: '1' },
              { label: '載具', type: 'postback', data: '2' },
              { label: '拍照', type: 'postback', data: '3' },
              { label: '手動', type: 'uri', uri: 'line://app/1597618539-an7pVDxb' }
            ]
          }
        })
    default:
      console.log(`Message from ${replyToken}: ${message.text}`);
  }
}

module.exports = router
