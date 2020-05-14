///<reference path="SheetBookingHandler.ts"/>
///<reference path="SheetUsersHandler.ts"/>
///<reference path="CalendarHandler.ts"/>
///<reference path="LineMessages.ts"/>

/*外部との通信を行う*/


//GETのハンドリング
function doGet(e) {
    return ContentService.createTextOutput("Hello World\n\n"+e.toString());
}


//POSTのハンドリング
function doPost(e) {
    const json = JSON.parse(e.postData.contents);
    //トリガーの共通部分
    const event = json.events[0];
    const eventType = event.type;
    // user情報
    const id = event.source.userId;


    //フォローされた
    if (eventType == "follow") {
        let user = getUserInfo(id);
        let name = user.displayName;
        let icon = user.pictureUrl;
        let statusMessage = user.statusMessage;
        let createdAt = new Date(event.timestamp);
        addUser([id, name, icon, statusMessage, createdAt, false]);
    }

    //ブロックされた
    else if (eventType == "unfollow") {
        deleteUser(id);
    }

    //postbackイベント
    else if (eventType == "postback") {
        const postback = JSON.parse(event.postback.data);

        /* =============予約============= */
        if(postback.action == "booking"){
            //予約開始
            if (postback.status == "start") {
                bookingNow(id); //予約中のフラグを立てる
                bookingDate(id); //日付選択へ
            }
            //日付選択完了
            if (postback.status == "date") {
                const date = new Date(event.postback.params.datetime);
                let name = getNameById(id);
                addNewBooking(id, name, date) //予約情報をBookingに追加
                bookingCourse(id); //コース選択へ
            }
            //コース選択完了
            if (postback.status == "course") {
                const course = postback.value;
                const rowNum = getLatestBookingById(id, 4, course);
                sendToCalendar(rowNum); //予約データの保存処理
            }
        }

        /* =============レポート============= */
        else if (postback.action == "report") {
            // TODO implement
            sendMessage(id, "この機能は未実装です。\n もうしばらくお待ち下さい。")
        }

        /* =============設定============= */
        else if (postback.action == "setting"){
            // TODO implement
            sendMessage(id, "この機能は未実装です。\n もうしばらくお待ち下さい。")
        }
    }

    //イベントを終了
    else if (eventType == "message") {
        const text = event.message.text;
        if (text == "中断") {
            //今予約中なら
            if (checkBookingNow(id)) {
                deleteLatestBookingById(id); //データの破棄
            }
        }
    }

    return ContentService.createTextOutput(e.postData.contents);
}
