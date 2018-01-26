
const fetch = require('node-fetch')

function check(url, invocationParameters, expectedResultData, expectedResultStatus) {

    const checkResult = {// this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

    let fetchData = {
        method: 'POST',
        body: data,
        headers: new Headers()
    }
    
    var nomi = Object.keys(invocationParameters);
    var valori = Object.value(invocationParameters);
    
    var to_send="{";
    
    for(i=0; i<nomi.length; i++){
        to_send += nomi[i] + ":" + valori[i];
    }
    
    to_send += "}";
    var left_to_send = JSON.stringify(expectedResultData);
    
    return fetch(url+to_send+left_to_send+expectedResultStatus, fetchData)
            .then(function () {
                result = JSON.parse(fetchData);
                var resp = true;
                var risultati = Object.value(result);
                for(j = 0; j< risultati.length; j++){
                    if(!compareResults(valori[i],risultati[i])) resp= false;
                }
                return resp;
            })
            .catch(function (err) {
                return err;
            });
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected)
        return true //always ok if there are no expectations
    if (!actual)
        return false
    for (let e of Object.keys(expected)) {
        if (actual[e] === undefined || expected[e] != actual[e])
            return false
    }
    return true
}

module.exports = check