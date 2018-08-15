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
            console.log(res.data)
            if (res.data === 'Status has been set eaten.')
              client.replyMessage(event.replyToken, [{ type: 'text', text: '恭喜你又消滅了一項食物！期待下次再一起去血拼！' }, { type: 'sticker', packageId: 2, stickerId: 516, }])
          }).catch(err => console.log(err))
      }
      else if (event.postback.data.includes('unnotify')) {
        const id = event.postback.data.split('=')[1]
        backendApi.post('/cabinet/userId/unnotify', { 'id': id })
          .then(res => {
            console.log(res.data)
            if (res.data === 'Notify has been turned off.')
              client.replyMessage(event.replyToken, [{ type: 'text', text: '好der！要趕快吃完喔！' }, { type: 'sticker', packageId: 2, stickerId: 165, }])
          }).catch(err => console.log(err))
      }
      else if (event.postback.data.includes('recipe')) {
        const food = event.postback.data.split('=')[1]
        switch (food) {
          case '大白菜':
            client.replyMessage(event.replyToken, msgFactory.flexSingle(require('../src/recipe/1.json')))
            break
          case '牛肉片':
            client.replyMessage(event.replyToken, msgFactory.flexSingle(require('../src/recipe/2.json')))
            break
        }
      }
      console.log(`Got postback: ${event.postback.data}`)
      return
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken, source) {
  switch (message.text) {
    case '新增清單':
      client.replyMessage(replyToken, msgFactory.addList)
      return;
    case '過期提醒':
      backendApi.get('/cabinet/userId/item_in_refrigerator')
        .then(res => {
          console.log(res.data)
          const nowDate = new Date(new Date(Date.now())
            .toLocaleString("zh-TW", {
              timeZone: "Asia/Taipei",
              hour12: false
            }))
          const expirationReminderList = res.data.refrigeratorList.filter(food => {
            food.expirationDate = new Date(
              new Date(food.acquisitionDate).getTime() +
              food.expirationDate * 24 * 60 * 60 * 1000)
              .toISOString().split('T')[0]
            food.expirationPeriod = Math.floor((new Date(food.expirationDate).getTime() -
              nowDate.getTime()) / 1000 / 24 / 60 / 60)
            return food.expirationPeriod <= 7 && food.expirationPeriod >= 0
          });
          client.replyMessage(replyToken, msgFactory.expirationReminder(expirationReminderList))
        })
        .catch(err => console.log(err))
      return;
    case '罐頭':
      client.replyMessage(replyToken, msgFactory.easyExpireReminder(message.text))
      return;
    case '起來':
      const msg = ['前端伺服器已經喚醒！']
      backendApi.get('/').then(res => {
        console.log(res.data)
        if (res.data === 'hello world')
          msg.push('後端伺服器已經喚醒！')
        replyText(replyToken, msg)
      }).catch(err => {
        console.log(err)
        msg.push('後端伺服器可能有問題？！')
        replyText(replyToken, msg)
      })
      return;
    default:
      console.log(`Message from ${replyToken}: ${message.text}`);
  }
}

module.exports = router
