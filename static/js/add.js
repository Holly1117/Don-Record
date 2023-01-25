window.addEventListener('load', () => {
    setReaderSelectBox();
});

function setReaderSelectBox() {

    let readerList = localStorage.getItem("readerNameList").split(",");

    const optionTag = readerList.map(v => {
        return `<option value="${v}">${v}</option>`
    })

    const youSelectBoxTag = `<select name="youDeck" class="selectModal" >${optionTag.join("")}</select>`
    const mySelectBoxTag = `<select name="myDeck" class="selectModal" >${optionTag.join("")}</select>`

    $("#youReadersBox")[0].innerHTML = `<p class="addTil">対戦デッキ</p>` + youSelectBoxTag;
    $("#myRreadersBox")[0].innerHTML = `<p class="addTil">使用デッキ</p>` + mySelectBoxTag;

}

function savedRecordData() {

    // document
    const myName = document.recordDataForm.myName;
    const youName = document.recordDataForm.youName;
    const myDeck = document.recordDataForm.myDeck;
    const youDeck = document.recordDataForm.youDeck;
    const myFirst = document.recordDataForm.myFirst;
    const myResult = document.recordDataForm.myResult;

    // options
    const myNameValue = myName.options[myName.selectedIndex].value;
    const youNameValue = youName.options[youName.selectedIndex].value;
    const myDeckValue = myDeck.options[myDeck.selectedIndex].value;
    const youDeckValue = youDeck.options[youDeck.selectedIndex].value;
    const myFirstValue = myFirst.value;
    const myResultValue = myResult.value;

    // date
    const today = moment();
    const todayFormat = today.format("YYYY/MM/DD HH:mm:ss")

    const setRecordDate = [todayFormat, myNameValue, myDeckValue, youNameValue, youDeckValue, myResultValue, myFirstValue];

    if (myNameValue == youNameValue) {
        return alert("自分と相手の名前が同一です。異なる自分か相手の名前を選択してください。")
    }
    postRecordData(setRecordDate);
}

function postRecordData(recordData) {

    fetch(API_KEY + BATTLE_PARAMETER, {
        method: "POST",
        body: recordData
    })
        .then(function (response) {
            console.log("status=" + response.status);
            return response.json();
        })
        .then(function (data) {
            console.log(JSON.stringify(data));
            alert("戦績の保存が成功しました。");
            document.location.reload()
        })
        .catch(function (err) {
            console.log("err=" + err);
            alert("戦績の保存が失敗しました。担当者にお問い合わせてください。");
            document.location.reload()
        });

}