///<reference path="Utils.ts"/>

/*SpreadSheetの［Booking］の編集を行う*/


//シートを取得
function initBocking() {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Booking");
}

//idで最新の予約情報を検索してデータを追加
function addNewBooking(id, name, date) {
    const sheet = initBocking();
    sheet.appendRow([id, name, date]);
}

//idで最新の予約情報を検索してデータを追加
function getLatestBookingById(id, colNum, data) {
    const sheet = initBocking();
    const rowNum =  findLastRow(sheet,id,"A:A")
    sheet.getRange(rowNum, colNum).setValue(data);
    return rowNum
}

//idで最新の予約情報を検索してその行を消去
function deleteLatestBookingById(id) {
    const sheet = initBocking();
    const rowNum = findLastRow(sheet,id,"A:A")
    sheet.deleteRows(rowNum, 1);
}
