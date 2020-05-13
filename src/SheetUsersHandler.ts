///<reference path="Utils.ts"/>

/*SpreadSheetの［Users］の編集を行う*/


//シートを取得
function initUser() {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
}
//ユーザの追加
function addUser(row) {
    //UsersからUserの読み込み
    const sheet = initUser();
    sheet.appendRow(row);
}
//ユーザの削除
function deleteUser(id) {
    //UsersからUserの読み込み
    const sheet = initUser();
    const rowNum = findRow(sheet,id,1)
    sheet.deleteRows(rowNum, 1);
}
//idからユーザ名を検索
function getNameById(id) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
    const rowNum = findRow(sheet,id,1)
    return sheet.getRange(rowNum, 2).getValue();
}
//今予約中か
function checkBookingNow(id) {
    //UsersからUserの読み込み
    const sheet = initUser();
    const rowNum = findRow(sheet,id,1)
    return sheet.getRange(rowNum, 6).getValue();
}
//予約中（アクティブ）フラグを立てる
function bookingNow(id) {
    //UsersからUserの読み込み
    const sheet = initUser();
    const rowNum = findRow(sheet,id,1)
    sheet.getRange(rowNum, 6).setValue(true);
}
