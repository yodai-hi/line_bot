///<reference path="CalendarController.ts"/>

//データの受け取り
function receiveData(data){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Booking");
  const json = JSON.parse(data.postData.contents);
  const id = json.events[0].source.userId;
  switch(true){
    case true:
      break;
    case json.postback.data.match("booking"):
      //日付選択へ
      bookingDate();
      break;

    case "postback" in json && "params" in json.postback:
      const date = new Date(json.postback.param.datetime);
      const name = getNameById(id);
      sheet.appendRow([id, name, date]);
      //コース選択へ
      bookingCourse();
      break;

    case json.postback.data.match("course"):
      const course = json.postback.data.split("=")(1);
      const col = 4;
      const row = getLatestBookingById(id);
      sheet.getRange(row, col).setValue(course)
      //データの保存処理
      initCalendar(row);
      break;

    case json.message.text=="中断":
      //データの破棄
      deleteLatestBookingById(id);
      break;

    default:
      console.log("")
  }


}

//日付選択
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
          "data": "yoyaku",
          "mode": "date",
          "initial": "2020-05-11",
          "max": "2021-05-11",
          "min": "2019-05-11"
        }
      ],
      "title": "予約日程",
      "text": "予約する日を選んでください．"
    }
  };

  const options = {
    method: 'post',
    json_header: info.json_header,
    payload: JSON.stringify(payload)
  };

  // @ts-ignore
  const response = UrlFetchApp.fetch(info.url.message, options);
  console.log(response);
}

//コース選択
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
          "text": "booking_course",
          "data": "15"
        },
        {
          "type": "postback",
          "label": "30分コース",
          "text": "course",
          "data": "30"
        },
        {
          "type": "postback",
          "label": "60分コース",
          "text": "course",
          "data": "60"
        },
        {
          "type": "postback",
          "label": "90分コース",
          "text": "course",
          "data": "90"
        }
      ],
      "title": "予約コース選択",
      "text": "予約するコースを選んでください"
    }
  };

  const options = {
    method: 'post',
    json_header: info.json_header,
    payload: JSON.stringify(payload)
  };

  // @ts-ignore
  const response = UrlFetchApp.fetch(info.url.message, options);
  console.log(response);
}

//idで最新の予約情報を検索
function getLatestBookingById(id){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Booking");
  //[正規表現を使用した検索]有効
  const finder = sheet.createTextFinder(id).useRegularExpression(true);
  const results = finder.findAll();

  return parseInt(results[-1][2].slice(1))
}

//idからユーザ名を検索
function getNameById(id){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
  //[正規表現を使用した検索]有効
  const finder = sheet.createTextFinder(id).useRegularExpression(true);
  const results = finder.findAll();
  const col = 2;
  const row = parseInt(results[-1][2].slice(1));

  return sheet.getRange(row, col).getValue()
}

//idで最新の予約情報を検索してその行を消去
function deleteLatestBookingById(id){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Booking");
  //[正規表現を使用した検索]有効
  const finder = sheet.createTextFinder(id).useRegularExpression(true);
  const results = finder.findAll();
  sheet.deleteRows(parseInt(results[-1][2].slice(1)), 1);
}
