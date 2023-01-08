function setReaderSelectBox(){
    const jsonUrl = "./static/json/reader.json"

    let readerList;

    $.ajaxSetup({ async: false });
    $.getJSON(jsonUrl, function (jsonData) {
        readerList = jsonData;
    });
    $.ajaxSetup({ async: true });

    const readersList = readerList.map(v=>{
        return v.reader_name;
    })

    const optionTag = readersList.map(v=>{
        return `<option value="${v}">${v}</option>`
    })

    const selectBoxTag = `<select name="series" class="selectModal" id="readers">${optionTag.join("")}</select>`
    
    $("#youReadersBox")[0].innerHTML = selectBoxTag;
    $("#myRreadersBox")[0].innerHTML = selectBoxTag;
    
}

window.onload = function(){
setReaderSelectBox();
}