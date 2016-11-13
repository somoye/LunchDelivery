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


            console.log("Error " + xhr.responseText);
            var message;
            var statusErrorMap = {
                '400': "Bad request: ",
                '401': "Unauthorized access",
                '403': "Unauthorized access",
                '404': "Not Found: ",
                '500': "Server error: "
            };
            if (xhr.status) {
                message = statusErrorMap[xhr.status];
                if (!message) {
                    message = "Unknown Error " + err;
                }
            } else {
                message = "Unknown Error " + err;
            }
            $(".err-panel").html(message);
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