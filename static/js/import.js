const API_KEY = "https://script.google.com/macros/s/AKfycbzptfxiwX-hRcTCDry2ESuINEzRmZH-Qn3lFd_8dsLJHPaZZytgbckAPPcR6Ffb3J7M/exec";

const BATTLE_PARAMETER = "?sheetName=battleRecord";

const RECIPE_PARAMETER = "?sheetName=recipeRecord";

const VER_NAME = "ver 1.991"

const getReaderList = () => {
    const jsonUrl = "./static/json/reader.json"

    if (!localStorage.getItem("readerImageList") || !localStorage.getItem("readerNameList") || localStorage.getItem("verName") != VER_NAME) {
        $.ajaxSetup({ async: false });
        $.getJSON(jsonUrl, function (jsonData) {
            readerList = jsonData;
        });
        $.ajaxSetup({ async: true });

        const readerNameList = readerList.map(v => {
            return v.reader_name;
        })

        const readerImageList = readerList.map(v => {
            return v.reader_image_url;
        })

        localStorage.removeItem("verName");
        localStorage.setItem("verName", VER_NAME);
        localStorage.removeItem("readerNameList");
        localStorage.setItem("readerNameList", readerNameList);
        localStorage.removeItem("readerImageList");
        localStorage.setItem("readerImageList", readerImageList);
    }
};

function battleAddedPage() {
    location.href = "/Don-Record/add";
}

function battleRecordPage() {
    location.href = "/Don-Record/record";
}

function recipePage() {
    location.href = "/Don-Record/recipe";
}

const setHeaderParts = () => {

    const titleTag = `<div class="centering"><h2 class="categoryTitle"><a href="/Don-Record/index">Don!!Record</a><p>${VER_NAME}</p></h2></div>`;

    const battleButtonTag = `<input type="submit" class="funButton" onclick="battleAddedPage()" value="対戦の記録">`;

    const recordButtonTag = `<input type="submit" class="funButton" onclick="battleRecordPage()" value="過去の戦績表">`;

    const dataTag = `<input type="submit" class="funButton unavailable" onclick="" value="デッキの登録">`;

    const pageTitle = `<div class="rulesInner"><div class="boxTxt"><h3 class="rulesColTit rulesFunction">ページ</h3></div>${battleButtonTag}${recordButtonTag}${dataTag}</div>`;

    const headerTag = titleTag + pageTitle;

    $("#header")[0].innerHTML = headerTag;

};

window.addEventListener('load', () => {
    getReaderList();
    setHeaderParts();
});