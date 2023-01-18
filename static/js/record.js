
function getRecordData(descendingOrderFlag) {

    const request = new XMLHttpRequest();

    request.open('GET', API_KEY, true);

    request.onload = function () {
        const responseData = this.response;
        setBattleRecord(responseData, descendingOrderFlag)
    }

    request.send();
}

function setBattleRecord(responseData, descendingOrderFlag) {

    const json = responseData;

    const recordsList = JSON.parse(json);

    const battlesData = []

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
            battle_date: recordData.date,
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

    const sortedBattlesData = !descendingOrderFlag ? battlesData : battlesData.sort(function (a, b) {
        if (a.battle_date > b.battle_date) {
            return -1; span
        } else {
            return 1;
        }
    });

    const setDateYearsTime = [];

    sortedBattlesData.map((value) => {
        const dateYearsTime = formatBattleDateYears(value.battle_date);
        if (!setDateYearsTime.includes(dateYearsTime)) {
            setDateYearsTime.push(dateYearsTime);
        }
    });

    const mapObject = new Map();

    sortedBattlesData.map((value) => {

        const dateHours = formatBattleDateHours(value.battle_date);
        const dateYears = formatBattleDateYears(value.battle_date);

        const battleDateTag = `<p class="rulesInfoHoursDate battleDate"><span>${dateHours}</span></p>`

        const myBattleDetailTag = setBattleDetailTag(value.my_reader, value.my_reader_image, value.my_name, value.my_winner, value.my_first);
        const youBattleDetailTag = setBattleDetailTag(value.you_reader, value.you_reader_image, value.you_name, !value.my_winner, !value.my_first);

        const battleOrderTag = value.my_winner ? myBattleDetailTag + youBattleDetailTag : youBattleDetailTag + myBattleDetailTag;
        const battlesInfoTag = `<div class="battlesInfo" >${battleDateTag}${battleOrderTag}</div>`;

        if (mapObject.has(dateYears)) {
            const recordObject = mapObject.get(dateYears)
            mapObject.set(dateYears, recordObject + battlesInfoTag);
        }else{
            mapObject.set(dateYears, battlesInfoTag);
        }
    });

    const recordsTag = [];

    mapObject.forEach((value, key) => {
        const recordTag = `<div class="recordsInfo" id="recordsInfo"><p class="YearsDateTit rulesInfoYearsDate">${key}</a>${value}</div>`
        recordsTag.push(recordTag)
    });

    $("#battlesBox")[0].innerHTML = recordsTag.join("");

}

function formatBattleDateHours(battleDate) {

    const beforeDate = new Date(battleDate)

    return new Intl.DateTimeFormat("ja-jp", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(beforeDate);
}

function formatBattleDateYears(battleDate) {

    const beforeDate = new Date(battleDate)

    return new Intl.DateTimeFormat("ja-jp", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(beforeDate);
}

function setTimeTitTag(nowSetTime, dataTime) {
    const formatSetTime = formatBattleDateYears(nowSetTime);
    const formatDataTime = formatBattleDateYears(dataTime);
    return formatSetTime != formatDataTime ? `<div>${formatDataTime}</div>` : ``;
}

function setBattleDetailTag(readerName, reader_image, playerName, result, first) {
    const resultLabels = (boolean) => {
        return boolean ? 'WIN' : 'LOSE';
    }
    const resultClass = (boolean) => {
        return boolean ? 'winTit' : 'loseTit';
    }
    const thumnailClass = (boolean) => {
        return boolean ? 'winBack' : 'loseBack';
    }
    const firstLabels = (boolean) => {
        return boolean ? '先攻' : '後攻';
    }

    const imageTag = `<img src=\"${reader_image}\" title="${readerName}">`;
    const firstLabelTag = `<h2 class="battleTit ${resultClass(result)}">${resultLabels(result)}<span>-${firstLabels(first)}-</span></h2>`;
    const playerNameTag = `<dt class="battleTxt">名前:<span>${playerName}</span></dt>`;
    const readerTag = `<dt class="battleTxt">リーダー:<span>${readerName}</span></dt>`;
    const battleDetailTag = `<li class="battlesDetail"><div class="eventThumnail ${thumnailClass(result)}">${imageTag}</div><dl class="battleRight">${firstLabelTag}${playerNameTag}${readerTag}</dl></li>`;
    return battleDetailTag;
}

function recordSort() {
    const sordBtnContent = document.getElementById('sordButton').textContent;
    const sordBtnSwitching = content => { return content == '新しい順' ? `古い順` : '新しい順'; }
    document.getElementById('sordButton').textContent = sordBtnSwitching(sordBtnContent);
    const battleRecord = document.getElementsByClassName("recordsInfo");
    const battleArray = Array.prototype.slice.call(battleRecord);
    const sordedbattleArray = battleArray.reverse();
    for (const i in sordedbattleArray) {
        battlesBox.removeChild(sordedbattleArray[i])
        battlesBox.appendChild(sordedbattleArray[i])
    }
}

getRecordData(true);

