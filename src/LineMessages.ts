///<reference path="Utils.ts"/>

/*ユーザへのメッセージの送信を行う*/


//環境情報の設定
function initLine() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config");
    const token = sheet.getRange("B7").getValue();
    const url_reply = "https://api.line.me/v2/bot/message/reply";
    const url_message = "https://api.line.me/v2/bot/message/push";
    const url_profile = "https://api.line.me/v2/bot/profile";
    const url_menu = "https://api.line.me/v2/bot/richmenu";

    const json_header = {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + token
    };
    const image_header = {
        "Content-Type": "image/png",
        "Authorization": "Bearer " + token
    };

    return {
        token: token,
        url: {
            reply: url_reply,
            message: url_message,
            profile: url_profile,
            menu: url_menu
        },
        json_header: json_header,
        image_header: image_header
    };
}

//ユーザ情報の取得
function getUserInfo(id) {
    const info = initLine();
    const options = {
        "method": 'get',
        "headers": info.json_header
    };
    // @ts-ignore
    const response = UrlFetchApp.fetch(info.url.profile + "/" + id, options);
    return JSON.parse(response);
}

//日付選択メッセージを送信
function bookingDate(id) {
    const info = initLine();
    const min = datetimePickerFormatter(new Date());
    const date = new Date()
    date.setFullYear(date.getFullYear()+1)
    const max = datetimePickerFormatter(date)

    const payload = {
        "to": id,
        "messages":[
            {
                "type": "template",
                "altText": "this is a buttons template",
                "template": {
                    "type": "buttons",
                    "actions": [
                        {
                            "type": "datetimepicker",
                            "label": "日時選択",
                            "data": "{\"action\":\"booking\", \"status\":\"date\"}",
                            "mode": "datetime",
                            "initial": min,
                            "max": max,
                            "min": min
                        }
                    ],
                    "title": "予約日程",
                    "text": "予約する日を選んでください．"
                }
            }
        ]
    };

    const options = {
        "method": 'post',
        "headers": info.json_header,
        "payload": JSON.stringify(payload)
    };
    // @ts-ignore
    return UrlFetchApp.fetch(info.url.message, options);
}

//コース選択メッセージを送信
function bookingCourse(id) {
    const info = initLine();
    const payload = {
        "to": id,
        "messages":[
            {
                "type": "template",
                "altText": "this is a buttons template",
                "template": {
                    "type": "buttons",
                    "actions": [
                        {
                            "type": "postback",
                            "label": "15分コース",
                            "text": "15分コースで予約",
                            "data": "{\"action\":\"booking\", \"status\":\"course\", \"value\":15}"
                        },
                        {
                            "type": "postback",
                            "label": "30分コース",
                            "text": "30分コースで予約",
                            "data": "{\"action\":\"booking\", \"status\":\"course\", \"value\":30}"
                        },
                        {
                            "type": "postback",
                            "label": "60分コース",
                            "text": "60分コースで予約",
                            "data": "{\"action\":\"booking\", \"status\":\"course\", \"value\":60}"
                        },
                        {
                            "type": "postback",
                            "label": "90分コース",
                            "text": "90分コースで予約",
                            "data": "{\"action\":\"booking\", \"status\":\"course\", \"value\":90}"
                        }
                    ],
                    "title": "予約コース選択",
                    "text": "予約するコースを選んでください"
                }
            }
        ]
    };
    const options = {
        "method": 'post',
        "headers": info.json_header,
        "payload": JSON.stringify(payload)
    };
    console.log(options)
    // @ts-ignore
    return UrlFetchApp.fetch(info.url.message, options);
}

//メッセージを送信
function sendMessage(id, message) {
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
    return UrlFetchApp.fetch(info.url.message, options);
}
