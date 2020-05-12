///<reference path="LineBot.ts"/>

function generateRichMenu(){
  const info = initLine();

  const data = {
    "size": {
      "width": 2500,
      "height": 843
    },
    "selected": true,
    "name": "menu",
    "chatBarText": "Menu",
    "areas": [
      {
        "bounds": {
          "x": 70,
          "y": 58,
          "width": 726,
          "height": 726
        },
        "action": {
          "type": "message",
          "text": "人工知能を用いた簡易診断を行いますか？"
        }
      },
      {
        "bounds": {
          "x": 891,
          "y": 58,
          "width": 726,
          "height": 726
        },
        "action": {
          "type": "postback",
          "text": "予約を開始します．途中でキャンセルしたい場合は中断と送ってください．",
          "data": "booking"
        }
      },
      {
        "bounds": {
          "x": 1712,
          "y": 62,
          "width": 726,
          "height": 722
        },
        "action": {
          "type": "message",
          "text": "連絡します"
        }
      }
    ]
  };

  let doc_options = {
    "method": "post",
    "contentType": "application/json",
    "headers": info.json_header,
    "payload": JSON.stringify(data),
    "muteHttpExceptions": true
  };
  console.log(doc_options)

  // @ts-ignore
  let response = UrlFetchApp.fetch(info.url.menu, doc_options);
  console.log(response.getResponseCode(), response.getContentText())
  
  // //リッチメニューの画像を送信
  // const json = JSON.parse(response.getContentText());
  // const id = json.richMenuId;
  // const fileID = "1eL1U6ZSTe6fSorJgd9aNnbUV7dWRflwE";
  // const file = DriveApp.getFileById(fileID);
  // console.log(file.getName());
  //
  // let img_options = {
  //   "method": "post",
  //   "contentType": "image/png",
  //   "headers": info.image_header,
  //   "payload": Utilities.newBlob(file.getBlob().getBytes(), "image/png", "menu.png").toString()
  // };
  // console.log(img_options)
  //
  // // @ts-ignore
  // response = UrlFetchApp.fetch(info.url.menu+"/"+id+"/content", img_options);
  // console.log(response)
  
}
