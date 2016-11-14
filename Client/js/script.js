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

function orderItemClickHandler(item_name, currentButton) {
    makePostReq("users/me/orders", {
        dishId: item_name
    }, function () {
        currentButton.html('???');
    }, function () {
        alert('Please log in');
    });
};



var panelGrid = $('.active-menu');


makeGetReq("menu", {}, function (response) {


    $.each(response.categories, function (i) {
        console.log(response);


        var panelGridCell = $('<div class="panel-grid-cell">').html(
            '<div class="list-menu">' +
            '<h3>' + response.categories[i].name + '</h3>' + '</div>' +
            ' <ul class="list-menu-content "/>')

        .appendTo(panelGrid);

        panelGridCell.find('.list-menu').css("background-image", "url(" + response.categories[i].image + ")");

        var list = panelGridCell.find('ul');

        $.each(response.categories[i].dishes, function (j) {
            var itemId = response.categories[i].dishes[j].id;


            var currentItem = $('<li class="list-product list-product-active"/>')
                .html('<div class="list-product-title">' + '<span class="dish">' + response.categories[i].dishes[j].name + '</span>' + '<span class="dotted"></span>' + '</div>' +
                    '<div class="list-product-desc">' + '<p class="description">' + response.categories[i].dishes[j].description + '</p>' + '</div>' +
                    '<div class="list-product-price">' + '<span class="price">' + response.categories[i].dishes[j].price + '</span>' + '</div>' +
                    '<div class="clear" />' +
                    '<span class="order-product">????????</span>').appendTo(list);

            currentItem.attr("id", itemId);


            var currentButton = currentItem.find(".order-product");
            currentButton.click(function () {

                // currentButton.html('<div class="loader"></div>');
                orderItemClickHandler(itemId, currentButton);


            });

        });
    });
})
makeGetReq("users/me/orders", {}, function (response) {
    $.each(response, function (i) {
        var orderedDish = response[i].dishId;
        console.log(orderedDish);
        $("#" + orderedDish + " .order-product").html("Okey:" + response[i].amount);

    });

})