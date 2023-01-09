function getRecordData() {

    const request = new XMLHttpRequest();

    request.open('GET', API_KEY, true);

    request.onload = function () {
        const responseData = this.response;
        setNowBattleRecord(responseData)
    }

    request.send();
}

function setNowBattleRecord(responseData) {

    const json = responseData;

    const recordsList = JSON.parse(json);

    const battlesData = []

    const formatBattleDate = (battleDate) => {

        const beforeDate = new Date(battleDate)

        return new Intl.DateTimeFormat("ja-jp", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(beforeDate);
    }

    const jsonUrl = "./static/json/reader.json"

    let readerList;

    $.ajaxSetup({ async: false });
    $.getJSON(jsonUrl, function (jsonData) {
        readerList = jsonData;
    });
    $.ajaxSetup({ async: true });

    const readerImage = (readerName) => {

        return readerList.find(v => {
            if (v.reader_name == readerName) {
                return v;
            }
        })
    };

    for (const i in recordsList) {
        const recordData = recordsList[i];
        const battleData = {
            battle_date: formatBattleDate(recordData.date),
            my_name: recordData.my_name,
            my_reader: recordData.my_reader,
            my_reader_image: readerImage(recordData.my_reader).reader_image_url,
            you_name: recordData.you_name,
            you_reader: recordData.you_reader,
            you_reader_image: readerImage(recordData.you_reader).reader_image_url,
            my_first: recordData.my_first,
            my_winner: recordData.my_winner
        }
        battlesData.push(battleData);
    }

    const sortedBattlesData = battlesData.sort(function (a, b) {
        if (a.battle_date > b.battle_date) {
            return -1;
        } else {
            return 1;
        }
    });

    const recordsTag = sortedBattlesData.map((value) => {

        const battleDateTag = `<dev class="rulesInfoDate battleDate"><span>${value.battle_date}</span></dev>`

        const myBattleDetailTag = setBattleDetailTag(value.my_reader, value.my_reader_image, value.my_name, value.my_winner, value.my_first);
        const youBattleDetailTag = setBattleDetailTag(value.you_reader, value.you_reader_image, value.you_name, !value.my_winner, !value.my_first);

        let battleOrderTag = value.my_winner ? myBattleDetailTag + youBattleDetailTag : youBattleDetailTag + myBattleDetailTag;
        return `<dev class="battlesInfo">${battleDateTag}${battleOrderTag}</div>`
    })

    $("#nowBattlesBox")[0].innerHTML = recordsTag[0];

}

function setBattleDetailTag(readerName, reader_image, playerName, result, first) {
    const resultLabels = (boolean) => {
        return boolean ? 'WIN' : 'LOSE';
    }
    const resultClass = (boolean) => {
        return boolean ? 'winTit' : 'loseTit';
    }
    const firstLabels = (boolean) => {
        return boolean ? '先攻' : '後攻';
    }

    const imageTag = `<img src=\"${reader_image}\" title="${readerName}">`;
    const firstLabelTag = `<h2 class="battleTit ${resultClass(result)}">${resultLabels(result)}<span>-${firstLabels(first)}-</span></h2>`;
    const playerNameTag = `<dt class="battleTxt">名前:<span>${playerName}</span></dt>`;
    const readerTag = `<dt class="battleTxt">リーダー:<span>${readerName}</span></dt>`;
    const battleDetailTag = `<li class="battlesDetail"><div class="eventThumnail">${imageTag}</div><dl class="battleRight">${firstLabelTag}${playerNameTag}${readerTag}</dl></li>`;
    return battleDetailTag;
}

getRecordData();