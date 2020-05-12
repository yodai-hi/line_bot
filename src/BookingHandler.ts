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
