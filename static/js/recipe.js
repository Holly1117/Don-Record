window.addEventListener('load', () => {
    setReaderImage();
    getRecipeData();
});

function setReaderImage() {

    const readerImageList = localStorage.getItem("readerImageList").split(",");
    const readerNameList = localStorage.getItem("readerNameList").split(",");

    const readerImgTag = readerImageList.map((value, index) => {
        return `<img class="readerCard" src="${value}" alt="${readerNameList[index]}" title="${readerNameList[index]}">`
    })

    $("#deckRecipe")[0].innerHTML = readerImgTag.join("");

}

function getRecipeData() {

    const request = new XMLHttpRequest();

    request.open("GET", API_KEY + RECIPE_PARAMETER, true);

    request.onload = function () {
        const responseData = this.response;
        setRecipeData(responseData)

    }

    request.send();
}

function setRecipeData(responseData, setReaderName) {

    const json = responseData;
    const recordsList = JSON.parse(json);
    const recipesData = []

    for (const i in recordsList) {
        const recordData = recordsList[i];
        const recipeData = {
            reader_name: recordData.reader_name,
            image_base64: recordData.recipe_image_base64,
            recipe_title: recordData.recipe_title,
        }
        recipesData.push(recipeData);
    }

    const recipesTag = []

    recipesData.map((value) => {

        const titleTag = `<div class="recipeTitle">${value.recipe_title}</div>`;
        const imageTag = `<img class="recipeImage" src="${value.image_base64}">`;
        const aTag = `<a class="recipeLink" href="${value.image_base64}" target="_blank">${titleTag}${imageTag}</a>`;
        const recipeCardTag = `<li class="recipeCard">${aTag}</li>`;

        recipesTag.push(recipeCardTag);
    });

    $("#recipeList")[0].innerHTML = recipesTag.join("");

}