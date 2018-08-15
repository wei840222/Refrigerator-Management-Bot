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
        title: `${element.nameZh}快過期囉！`,
        text: element.expirationDate,
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
  cookBook: {
    "type": "flex",
    "altText": "this is a flex message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://tokyo-kitchen.icook.network/uploads/recipe/cover/247857/large_c6d0e4092c55a07b.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "margin": "none",
        "action": {
          "type": "uri",
          "label": "按鈕",
          "uri": ""
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "千層白菜封肉",
            "weight": "bold",
            "wrap": false,
            "color": "#464646",
            "flex": 1,
            "size": "xl",
            "margin": "none",
            "align": "start",
            "gravity": "top"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "食材",
                    "weight": "regular",
                    "wrap": false,
                    "color": "#aaaaaa",
                    "flex": 1,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                  },
                  {
                    "type": "text",
                    "text": "大白菜葉、鹽、豬肉腿瘦絞肉、黑胡椒粒",
                    "weight": "regular",
                    "wrap": true,
                    "color": "#666666",
                    "flex": 5,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                  }
                ],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "時長",
                    "weight": "regular",
                    "wrap": false,
                    "color": "#aaaaaa",
                    "flex": 1,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                  },
                  {
                    "type": "text",
                    "text": "40分鐘",
                    "weight": "regular",
                    "wrap": true,
                    "color": "#666666",
                    "flex": 5,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                  }
                ],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
              }
            ],
            "flex": 1,
            "spacing": "sm",
            "margin": "lg"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [],
            "flex": 0,
            "spacing": "none",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [],
            "flex": 0,
            "spacing": "none",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [],
            "flex": 0,
            "spacing": "none",
            "margin": "md"
          }
        ],
        "flex": 1,
        "spacing": "none",
        "margin": "md"
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "查看食譜",
              "uri": ""
            },
            "flex": 1,
            "margin": "none",
            "height": "sm",
            "style": "link",
            "color": "#42659a",
            "gravity": "top"
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "找下一份",
              "uri": ""
            },
            "flex": 1,
            "margin": "none",
            "height": "sm",
            "style": "link",
            "color": "#42659a",
            "gravity": "top"
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0,
        "spacing": "sm",
        "margin": "md"
      },
      "styles": {
        "header": {
          "backgroundColor": "#FFFFFF",
          "separator": false,
          "separatorColor": "#FFFFFF"
        },
        "hero": {
          "backgroundColor": "#FFFFFF",
          "separator": false,
          "separatorColor": "#FFFFFF"
        },
        "body": {
          "backgroundColor": "#FFFFFF",
          "separator": false,
          "separatorColor": "#FFFFFF"
        },
        "footer": {
          "backgroundColor": "#FFFFFF",
          "separator": false,
          "separatorColor": "#FFFFFF"
        }
      }
    }
  }
}
