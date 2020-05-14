/*環境に依存しない関数*/


//Date TImeのフォーマットに変換
/*
引数: Date
返値: String(YYYY-mm-dd t HH:mm)
*/
function datetimePickerFormatter(date){
    return `
        ${date.getFullYear()}-\
        ${(date.getMonth() + 1).toString().padStart(2, '0')}-\
        ${date.getDate().toString().padStart(2, '0')}t\
        ${date.getHours().toString().padStart(2, '0')}:\
        ${date.getMinutes().toString().padStart(2, '0')}\
        `.replace(/[\n\r ]/g, '')
}

//Date TImeのフォーマットに変換
/*
引数: Date
返値: String(YYYY-mm-dd t HH:mm)
*/
function datetimeJapanFormatter(date){
    return `
        ${(date.getMonth() + 1).toString()}月\
        ${date.getDate().toString()}日\
        ${date.getHours().toString().padStart(2, '0')}:\
        ${date.getMinutes().toString().padStart(2, '0')}\
        `.replace(/[\n\r ]/g, '')
}

//指定列の中にある要素を調べて一番最後の場所を返却
/*
引数: Sheet, any, String(A1)
返値: int
*/
function findLastRow(sheet,val,col){
    const values = sheet.getRange(col).getValues(); //A列の値を全て取得
    return values.filter(String).length;//空白の要素を除いた長さを取得
}

//指定列の中にある要素を調べて場所を返却
/*
引数: Sheet, any, int
返値: int
*/
function findRow(sheet,val,col){
    const dat = sheet.getDataRange().getValues(); //受け取ったシートのデータを二次元配列に取得

    for(let i=1; i<dat.length; i++){
        if(dat[i][col-1] === val){
            return i+1;
        }
    }
    return 0;
}
