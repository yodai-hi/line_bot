// Compiled using ts2gas 3.6.1 (TypeScript 3.8.3)
function initUser() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
    return sheet;
}

//ユーザの追加
function addUser(row) {
    //UsersからUserの読み込み
    const sheet = initUser();
    sheet.appendRow([1,2,3,4,5,6]);
}

//ユーザの削除
function deleteUser(id) {
    //UsersからUserの読み込み
    const sheet = initUser();
    const finder = sheet.createTextFinder(id).useRegularExpression(true);
    const results = finder.findNext();
    sheet.deleteRows(parseInt(results[1].slice(1)), 1);
}

//今予約中か
function checkBookingNow(id) {
    //UsersからUserの読み込み
    const sheet = initUser();
    const finder = sheet.createTextFinder(id).useRegularExpression(true);
    const results = finder.findNext();
    const rowNum = parseInt(results[1].slice(1));
    return sheet.getRange(rowNum, 6).getValue();
}

//予約中（アクティブ）フラグを立てる
function bookingNow(id) {
    //UsersからUserの読み込み
    const sheet = initUser();
    const finder = sheet.createTextFinder(id).useRegularExpression(true);
    const results = finder.findNext();
    const rowNum = parseInt(results[1].slice(1));
    sheet.getRange(rowNum, 6).setValue(true);
}
