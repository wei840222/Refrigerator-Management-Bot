module.exports = {
  addList: {
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
  },
  expirationReminder(expirationReminderList) {
    const msg = {
      type: "template",
      altText: "過期提醒",
      template: {
        type: "carousel",
        columns: [],
        imageAspectRatio: "rectangle",
        imageSize: "cover"
      }
    }
    expirationReminderList.forEach(element => {
      msg.template.columns.push({
        thumbnailImageUrl: process.env.BASE_URL + "carousel-vegetable.png",
        title: `${element.nameZh}還有${element.expirationPeriod}天就過期囉！`,
        text: `過期日：${element.expirationDate}`,
        actions: [
          {
            type: "postback",
            label: "已吃完",
            data: `eaten=${element.id}`
          },
          {
            type: "postback",
            label: "我會吃完，不用再提醒我啦！",
            data: `noneNotify=${element.id}`
          },
          {
            type: "postback",
            label: "推薦食譜",
            data: `cookbook=${element.nameZh}`
          }
        ]
      })
    })
    return msg
  },
  easyExpireReminder(text) {
    return {
      type: 'template',
      altText: '容易過期提醒',
      template: {
        type: 'buttons',
        text: `您新增的『${text}』商品屬於容易放過期的商品，要不要去確認一下準確的過期日呢？`,
        actions: [
          { label: '點我確認', type: 'postback', data: '1' },
        ]
      }
    }
  },
  flexSingle(flex) {
    return {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": flex
    }
  }
}
