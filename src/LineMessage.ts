//環境情報の設定
function initLine(){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config");
  const token = sheet.getRange("B7").getValue();
  const url_message = "https://api.line.me/v2/bot/message/push";
  const url_profile = "https://api.line.me/v2/profile";
  const url_menu = "https://api.line.me/v2/bot/richmenu";
  const json_header = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer "+token
  };
  const image_header = {
    "Content-Type": "image/png",
    "Authorization": "Bearer "+token
  };

  return {
    token: token,
    url: {
      message: url_message,
      profile: url_profile,
      menu: url_menu
    },
    json_header: json_header,
    image_header: image_header
  }
}

//ユーザ情報の取得
function getUserInfo(id){
  const info = initLine();
  const  options = {
    "method": 'get',
    "headers": info.json_header
  };

  // @ts-ignore
  const response = UrlFetchApp.fetch(info.url.profile+"/"+id, options);
  console.log(response);

  return JSON.parse(response)
}

//日付選択メッセージを送信
function bookingDate(){
  const info = initLine();
  const payload = {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "actions": [
        {
          "type": "datetimepicker",
          "label": "日時選択",
          "data": "{\"action\":\"booking\", \"status\":\"date\"}",
          "mode": "date",
          "initial": "2020-05-13",
          "max": "2021-12-31",
          "min": "2020-05-13"
        }
      ],
      "title": "予約日程",
      "text": "予約する日を選んでください．"
    }
  };

  const options = {
    method: 'post',
    headers: info.json_header,
    payload: JSON.stringify(payload)
  };

  // @ts-ignore
  const response = UrlFetchApp.fetch(info.url.message, options);
  console.log(response);
}

//コース選択メッセージを送信
function bookingCourse(){
  const info = initLine();
  const payload = {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "actions": [
        {
          "type": "postback",
          "label": "15分コース",
          "text": "course",
          "data": "{\"action\":\"booking\", \"status\":\"course\", \"value\":15}"
        },
        {
          "type": "postback",
          "label": "30分コース",
          "text": "{\"action\":\"booking\", \"status\":\"course\", \"value\":30}",
          "data": "30"
        },
        {
          "type": "postback",
          "label": "60分コース",
          "text": "{\"action\":\"booking\", \"status\":\"course\", \"value\":60}",
          "data": "60"
        },
        {
          "type": "postback",
          "label": "90分コース",
          "text": "{\"action\":\"booking\", \"status\":\"course\", \"value\":90}",
          "data": "90"
        }
      ],
      "title": "予約コース選択",
      "text": "予約するコースを選んでください"
    }
  };

  const options = {
    method: 'post',
    headers: info.json_header,
    payload: JSON.stringify(payload)
  };

  // @ts-ignore
  const response = UrlFetchApp.fetch(info.url.message, options);
  console.log(response);
}

//メッセージを送信
function sendMessage(id, message){
  const info = initLine();
  const payload = {
    "to": id,
    "messages": [{
      "type": "text",
      "text": message
    }]
  };

  const options = {
    "method": "post",
    "headers": info.json_header,
    "payload": JSON.stringify(payload)
  };

  // @ts-ignore
  const response = UrlFetchApp.fetch(info.url.message, options);
  console.log(response);
}
