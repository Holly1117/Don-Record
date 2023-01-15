const API_KEY = "https://script.google.com/macros/s/AKfycbyPQ4aSVKqhNDc3wooIT-XaLyNGRSeZomX1W6i3wYDF5Kr7cR4zl7u6o35WABWIInF_/exec";

const getReaderList = () => {
    const jsonUrl = "./static/json/reader.json"

    if (!localStorage.getItem('readerList')) {

        $.ajaxSetup({ async: false });
        $.getJSON(jsonUrl, function (jsonData) {
            readerList = jsonData;
        });
        $.ajaxSetup({ async: true });

        const readersList = readerList.map(v => {
            return v.reader_name;
        })

        localStorage.setItem('readerList', JSON.stringify(readersList));
        return readersList;

    } else {
        return localStorage.getItem('readerList').split(',');
    }
};