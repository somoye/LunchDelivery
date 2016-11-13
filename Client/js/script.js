"use strict"

function makeAjaxReq(path, method, data, success, error) {
    $.ajax({
        url: "http://localhost:3001/" + path,
        type: method,
        data: data,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        success: function showGreenMark(response) {
            console.log("good");
            success && success(response);
        },
        error: function showRedMark(xhr, status, err) {
            console.log("Error " + err);
            error && error();
        }
    });
};

function makeGetReq(path, data, success, error) {
    makeAjaxReq(path, "GET", data, success, error);
};

function makePostReq(path, data, success, error) {
    var dataToString = JSON.stringify(data);
    makeAjaxReq(path, "POST", dataToString, success, error);

};