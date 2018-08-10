const { Router } = require('express')
const router = Router()
const line = require('@line/bot-sdk')

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
}

// create LINE SDK client
const client = new line.Client(config)

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
      return;
    case '過期提醒':
      client.replyMessage(
        replyToken,
        {
          type: "template",
          altText: "過期提醒",
          template: {
            type: "carousel",
            columns: [
              {
                thumbnailImageUrl: process.env.BASE_URL + "vegetables.png",
                title: "高麗菜快過期囉！",
                text: "2018-8-31",
                actions: [
                  {
                    type: "postback",
                    label: "已吃完",
                    data: "a"
                  },
                  {
                    type: "postback",
                    label: "我知道了",
                    data: "b"
                  }
                ]
              },
              {
                thumbnailImageUrl: process.env.BASE_URL + "vegetables.png",
                title: "花椰菜快過期囉！",
                text: "2018-8-31",
                actions: [
                  {
                    type: "postback",
                    label: "已吃完",
                    data: "a"
                  },
                  {
                    type: "postback",
                    label: "我知道了",
                    data: "b"
                  }
                ]
              },
              {
                thumbnailImageUrl: process.env.BASE_URL + "vegetables.png",
                title: "空心菜快過期囉！",
                text: "2018-8-31",
                actions: [
                  {
                    type: "postback",
                    label: "已吃完",
                    data: "a"
                  },
                  {
                    type: "postback",
                    label: "我知道了",
                    data: "b"
                  }
                ]
              }
            ],
            imageAspectRatio: "rectangle",
            imageSize: "cover"
          }
        })
      return;
    case '罐頭':
      client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: '容易過期提醒',
          template: {
            type: 'buttons',
            text: `您新增的『${message.text}』商品屬於容易放過期的商品，要不要去確認一下準確的過期日呢？`,
            actions: [
              { label: '點我確認', type: 'postback', data: '1' },
            ]
          }
        })
      return;
    default:
      console.log(`Message from ${replyToken}: ${message.text}`);
  }
}

module.exports = router
