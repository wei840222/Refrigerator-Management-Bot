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
  expirationReminder(refrigeratorList) {
    const nowDate = new Date(new Date(Date.now())
      .toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false
      }))
    let expirationReminderList = refrigeratorList.filter(food => {
      food.expirationDate = new Date(
        new Date(food.acquisitionDate).getTime() +
        food.expirationDate * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0]
      food.expirationPeriod = Math.ceil((new Date(food.expirationDate).getTime() -
        nowDate.getTime()) / 1000 / 24 / 60 / 60)
      return food.expirationPeriod <= 7 && food.expirationPeriod >= 0 && food.notify
    });
    expirationReminderList.sort((a, b) => a.expirationPeriod > b.expirationPeriod ? 1 : -1)
    if (expirationReminderList.length > 10) expirationReminderList.slice(0, 10)
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
        title: element.expirationPeriod === 0 ? `${element.nameZh}今天就過期囉！` : `${element.nameZh}還有${element.expirationPeriod}天就過期囉！`,
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
            data: `unnotify=${element.id}`
          },
          {
            type: "postback",
            label: "推薦食譜",
            data: `recipe=${element.nameZh}`
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
