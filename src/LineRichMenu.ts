///<reference path="LineBot.ts"/>

function generateRichMenu(){
  const info = initLine();

  const payload = {
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

  let options = {
    method: "post",
    json_header: info.json_header,
    payload: JSON.stringify(payload)
  };

  // @ts-ignore
  let response = UrlFetchApp.fetch(info.url.image_header, options);
  console.log(response)
  
  //リッチメニューの画像を送信
  const json = JSON.parse(response);
  const id = json.richMenuId;
  const filename = "rich_menu.png";
  const file = DriveApp.getFilesByName(filename).next();
  options = {
    method: "post",
    json_header: info.image_header,
    payload: Utilities.newBlob(file.getBlob().getBytes(), "image/png", "rich_menu.png").toString()
  };

  // @ts-ignore
  response = UrlFetchApp.fetch(info.url.image_header+id+"/content", options);
  console.log(response)
  
}
