///<reference path="BookingHandler.ts"/>
///<reference path="UserHandler.ts"/>
///<reference path="CalendarHandler.ts"/>
///<reference path="LineMessage.ts"/>

//GETのハンドリング
function doGet(e) {
  return ContentService.createTextOutput("SUCCESS");
}

//POSTのハンドリング
function doPost(data){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Booking");
  const json = JSON.parse(data.postData.contents);
  //トリガーの共通部分
  const event = json.events[0]
  const eventType = event.type;
  //user情報
  const id = event.source.userId;
  const user = getUserInfo(id)
  const name = user.displayName;

  //フォローされた
  if (eventType == "follow"){
    const icon = getUserInfo(id).pictureUrl;
    const statusMessage = getUserInfo(id).statusMessage;
    const createdAt =  new Date(getUserInfo(id).timestamp*1000);
    addUser([id, name, icon, statusMessage, createdAt, false])
  }

  //ブロックされた
  if (eventType == "unfollow"){
    deleteUser(id)
  }

  //postbackイベント
  if(eventType == "postback"){
    const postback = JSON.parse(event.postback.data)
    //予約開始
    if (postback.action == "booking" && postback.status == "start"){
      bookingNow(id);//予約中のフラグを立てる
      bookingDate();//日付選択へ
    }

    //日付選択
    if (postback.action == "booking" && postback.status == "date"){
      const date = new Date(postback.params.datetime);
      const name = getNameById(id);
      sheet.appendRow([id, name, date]);

      bookingCourse();//コース選択へ
    }

    //コース選択
    if(postback.action == "booking" && postback.status == "course"){
      const course = postback.value;
      const col = 4;
      const row = getLatestBookingById(id);
      sheet.getRange(row, col).setValue(course)

      initCalendar(row);//予約データの保存処理
    }
  }

  //イベントを終了
  if(eventType == "message"){
    const text = event.message.text

    if (text == "中断"){
      //今予約中なら
      if (checkBookingNow(id)){
        deleteLatestBookingById(id); //データの破棄
      }
    }
  }
}

