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
  expirationReminder: {
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
  }
}
