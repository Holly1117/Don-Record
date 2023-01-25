window.addEventListener('load', () => {
    setReaderImage();
});

function setReaderImage() {

    const readerImageList = localStorage.getItem("readerImageList").split(",");
    const readerNameList = localStorage.getItem("readerNameList").split(",");

    const readerImgTag = readerImageList.map((value ,index) => {
        return `<img class="readerCard" src="${value}" alt="${readerNameList[index]}" title="${readerNameList[index]}">`
    })

    $("#deckRecipe")[0].innerHTML = readerImgTag.join("");

}