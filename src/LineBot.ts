function initLine(){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config");
  const token = sheet.getRange("B7").getValue();
  const url_message = "https://api.line.me/v2/bot/message/push";
  const url_profile = "https://api.line.me/v2/profile";
  const url_menu = "https://api.line.me/v2/bot/richmenu/";
  const json_header = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: 'Bearer ' + token,
  };
  const image_header = {
    "Content-Type": "image/png",
    Authorization: 'Bearer ' + token,
  };

  return {
    token: token,
    url: {
      message: url_message,
      profile: url_profile,
      image_header: url_menu
    },
    json_header: json_header,
    image_header: image_header
  }
}

function getUserInfo(){
  const info = initLine();
  const  options = {
    method: 'get',
    json_header: info.json_header
  };

  // @ts-ignore
  const response = UrlFetchApp.fetch(info.url.profile, options);
  console.log(response);
}

function sendMessage(id, message){
  const info = initLine();
  const payload = {
    to: id,
    messages: [{
      type: "text",
      text: message
    }]
  };

  const options = {
    method: "post",
    json_header: info.json_header,
    payload: JSON.stringify(payload)
  };

  // @ts-ignore
  const response = UrlFetchApp.fetch(info.url.message, options);
  console.log(response);
}
