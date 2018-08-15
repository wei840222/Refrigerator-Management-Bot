const express = require('express')
const lineBot = require('@line/bot-sdk')
const msgFactory = require('../src/msgFactory.js')
const axios = require('axios')
const backendApi = axios.create({
  baseURL: 'https://refrigerator-mgt-bot-backend.herokuapp.com/'
})

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
}

// create LINE SDK client
const client = new lineBot.Client(config)

// create Express instance
const router = express()

// register a webhook handler with middleware
router.post('/lineBot', lineBot.middleware(config), (req, res) => {
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
    case 'postback':
      if (event.postback.data.includes('eaten')) {
        const id = event.postback.data.split('=')[1]
        backendApi.post('/cabinet/userId/eaten', { 'id': id })
          .then(res => {
            client.replyMessage(event.replyToken, [{ type: 'text', text: '恭喜你又消滅了一項食物！期待下次再一起去血拼！' }, { type: 'sticker', packageId: 2, stickerId: 516, }])
          }).catch(err => console.log(err))
      }
      console.log(`Got postback: ${event.postback.data}`)
      return
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

async function handleText(message, replyToken, source) {
  switch (message.text) {
    case '新增清單':
      client.replyMessage(replyToken, msgFactory.addList)
      return;
    case '過期提醒':
      backendApi.get('/cabinet/userId/item_in_refrigerator')
        .then(res => {
          const nowDate = new Date(Date.now())
            .toLocaleString("zh-TW", {
              timeZone: "Asia/Taipei",
              hour12: false
            }).split(" ")[0]
            .replace(/\//g, "-")
          const expirationReminderList = res.data.refrigeratorList.filter(food => {
            food.expirationDate = new Date(
              new Date(food.acquisitionDate).getTime() +
              food.expirationDate * 24 * 60 * 60 * 1000
            )
              .toLocaleDateString("zh-TW")
              .replace(/\//g, "-")
            const expirationPeriod =
              new Date(food.expirationDate).getTime() -
              new Date(nowDate).getTime();
            return expirationPeriod <= 604800000 && expirationPeriod >= 0
          });
          client.replyMessage(replyToken, msgFactory.expirationReminder(expirationReminderList))
        })
        .catch(err => console.log(err))
      return;
    case '罐頭':
      client.replyMessage(replyToken, msgFactory.easyExpireReminder(message.text))
      return;
    case '起來':
      const backend = await backendApi.get('/')
      const msg = ['前端伺服器已經喚醒！']
      if (backend.data === 'hello world')
        msg.push('後端伺服器已經喚醒！')
      replyText(replyToken, msg)
      return;
    default:
      console.log(`Message from ${replyToken}: ${message.text}`);
  }
}

module.exports = router
