module.exports = {
  starterShoppingList: {
    type: "imagemap",
    baseUrl: process.env.BASE_URL + "img/bot/starterShoppingList",
    altText: "新增就這麼簡單！",
    baseSize: {
      height: 776,
      width: 1040
    },
    actions: [
      {
        type: "uri",
        linkUri: "line://app/1604016385-PNOA4Edd",
        area: {
          x: 0,
          y: 0,
          width: 1040,
          height: 776
        }
      }
    ]
  },
  starterRefrigeratorList: {
    type: "imagemap",
    baseUrl: process.env.BASE_URL + "img/bot/starterRefrigeratorList",
    altText: "過期隨時查看！",
    baseSize: {
      height: 776,
      width: 1040
    },
    actions: [
      {
        type: "uri",
        linkUri: "line://app/1604016385-8Lwakbvv?tab=refrigeratorList",
        area: {
          x: 0,
          y: 0,
          width: 1040,
          height: 776
        }
      }
    ]
  },
  addList: {
    type: 'template',
    altText: '新增清單',
    template: {
      type: 'buttons',
      text: '選擇何種新增方式呢？',
      actions: [
        { label: '發票 (Beta)', type: 'postback', data: '1' },
        { label: '載具 (Beta)', type: 'postback', data: '2' },
        { label: '拍照 (Beta)', type: 'uri', uri: 'line://nv/camera' },
        { label: '手動', type: 'uri', uri: 'line://app/1597618539-an7pVDxb' }
      ]
    }
  },
  expirationReminder(refrigeratorList, startIdx = 0) {
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
    let seeMore = null;
    startIdx = parseInt(startIdx)
    if ((expirationReminderList.length - startIdx) <= 10) {
      seeMore = false
      expirationReminderList = expirationReminderList.slice(startIdx, expirationReminderList.length)
    }
    else {
      seeMore = true
      expirationReminderList = expirationReminderList.slice(startIdx, startIdx + 9)
    }
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
    const imgSrc = {
      "冷凍": "img/bot/type-frozen-food.png",
      "飲料": "img/bot/type-drinks.png",
      "青菜": "img/bot/type-vegetable.png",
      "肉": "img/bot/type-meat.png",
      "海鮮": "img/bot/type-seafood.png",
      "點心": "img/bot/type-snack.png",
      "水果": "img/bot/type-fruit.png",
      "其他": "img/bot/type-others.png"
    }
    expirationReminderList.forEach(element => {
      msg.template.columns.push({
        thumbnailImageUrl: process.env.BASE_URL + imgSrc[element.type],
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
    if (seeMore) msg.template.columns.push({
      thumbnailImageUrl: process.env.BASE_URL + 'img/bot/see-more.png',
      title: '更多',
      text: '點下方按鈕看更多快過期食物。',
      actions: [
        {
          type: "postback",
          label: "看更多",
          data: `seeMore=${startIdx + 9}`
        },
        {
          "type": "uri",
          "label": "去冰箱看看",
          "uri": "line://app/1604016385-8Lwakbvv?tab=refrigeratorList"
        },
        {
          type: "postback",
          label: "不想再收到提醒",
          data: 'unnotify=all'
        }
      ]
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
  flexSingle(flex, altText) {
    return {
      type: "flex",
      altText: altText,
      contents: flex
    }
  },
  flexCarousel(flexArray, altText) {
    return {
      type: "flex",
      altText: altText,
      contents: {
        type: "carousel",
        contents: flexArray
      }
    }
  }
}
