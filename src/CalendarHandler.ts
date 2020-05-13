///<reference path="LineBot.ts"/>

/*カレンダーとの連携を行う*/


//カレンダーの情報を取得
function initCalendar() {
    //Configから環境情報の読み込み
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config");
    const parallel = sheet.getRange("B5").getValue();
    const calendarId = sheet.getRange("B6").getValue();
    //カレンダーインスタンスの生成
    const calendar = CalendarApp.getCalendarById(calendarId);
    return {
        parallel: parallel,
        calendar: calendar,
    }
}
//カレンダーに予約を登録する関数
function sendToCalendar(row) {
    const info = initCalendar()
    let message;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Booking");
    //登録する情報
    const id = sheet.getRange(row, 1).getValue();
    const name = sheet.getRange(row, 2).getValue();
    //登録に必要な時間情報
    const s_time = new Date(sheet.getRange(row, 3).getValue());
    const delta = sheet.getRange(row, 4).getValue();
    //予約の終了時間を計算
    const e_time = new Date(sheet.getRange(row, 3).getValue());
    const min = (e_time.getMinutes() + delta) % 60;
    const hour = e_time.getHours() + (e_time.getMinutes() + delta - ((e_time.getMinutes() + delta) % 60)) / 60;
    e_time.setHours(hour);
    e_time.setMinutes(min);

    try {
        //この時間帯が空いているかどうか
        if (checkBookable(info.calendar, s_time, e_time, info.parallel)) {
            //予約情報をカレンダーに追加
            const thing = name + "様　ご予約";
            info.calendar.createEvent(thing, s_time, e_time);
            message = name + "様　\n\n" + datetimeJapanFormatter(s_time) + "〜" + datetimeJapanFormatter(e_time) + "\n\n でご予約を承りました。\n\n ありがとうございました。";
            getLatestBookingById(id, 5, true);
        }
        else {
            message = name + "様　\n\n ご予約の時間に先約がありましたので、\n 申し訳ございませんが、ご予約いただけませんでした。\n\n ご予定を変更して再度お申込みください。";
            getLatestBookingById(id, 5, false);
        }
    }
    catch (exp) {
        //実行に失敗した時に通知
        message = "予約に失敗しました。 \n 時間を置いてもう一度やり直してください。";
        getLatestBookingById(id, 5, false);

    }
    //Botにメッセージを送信
    sendMessage(id, message);
}
// 先約があるかどうか調べる関数
function checkBookable(calendar, s_time, e_time, parallel) {
    let end_min;
    let end_hour;
    let start_min;
    let start_hour;

    const events = calendar.getEvents(s_time, e_time);
    const time_array = [];
    for (let ev in events) {
        if (events.hasOwnProperty(ev)){
            time_array.push(events[ev].getStartTime());
            time_array.push(events[ev].getEndTime());
        }
    }
    time_array.sort();
    let duplicate = 0;

    //予定の期間内に存在するイベントの開始，終了時刻付近の重複を調べる
    for (let i in time_array) {
        if (time_array[i] >= s_time && time_array[i] <= e_time) {
            if (time_array[i].getMinutes() == 0) {
                start_hour = time_array[i].getHours() - 1;
                start_min = 59;
            }
            else {
                start_hour = time_array[i].getHours();
                start_min = time_array[i].getMinutes() - 1;
            }
            if (time_array[i].getMinutes() == 59) {
                end_hour = time_array[i].getHours() + 1;
                end_min = 0;
            }
            else {
                end_hour = time_array[i].getHours();
                end_min = time_array[i].getMinutes() + 1;
            }
            const start = new Date(s_time);
            start.setHours(start_hour);
            start.setMinutes(start_min);
            const end = new Date(s_time);
            end.setHours(end_hour);
            end.setMinutes(end_min);
            console.log(start, end);
            const books = calendar.getEvents(start, end).length;
            if (duplicate < books) {
                duplicate = books;
            }
        }
    }
    return duplicate < parallel;
}
