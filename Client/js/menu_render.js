function makeOrder(dishID, dishPrice, makeOrderButton) {
    makePostReq("users/me/orders", {
        dishId: dishID
    }, function () {
        var dishAmont = makeOrderButton.parent().find(".number_dishes");
        var totalAmont = Number(dishAmont.val()) + 1;

        makeOrderButton.parent().find(".counter").show(); //show counter
        makeOrderButton.hide();
        makeOrderButton.parent().css("background", "#fff");
        dishAmont.val(totalAmont);

        totalOrderAmount++;
        $(".total-order").val(totalOrderAmount);

        totalOrderCost += dishPrice;
        $(".total-cost").val(totalOrderCost);
    });
};

function deleteDishFromOrder(dishID, dishPrice, buttonMinus, makeOrderButton) {
    makeDeleteReq("users/me/orders", {
        dishId: dishID
    }, function () {
        var dishAmont = buttonMinus.parent().find(".number_dishes");
        if (dishAmont.val() > 1) {
            var totalAmont = Number(dishAmont.val()) - 1;
            dishAmont.val(totalAmont);

        } else {
            totalAmont = Number(dishAmont.val()) - 1;
            dishAmont.val(totalAmont);
            buttonMinus.parent().hide();
            makeOrderButton.show();
            makeOrderButton.parent().css("background", "#ffb606");
        }
        totalOrderAmount--;
        $(".total-order").val(totalOrderAmount);

        totalOrderCost -= dishPrice;
        $(".total-cost").val(totalOrderCost);
    });
};

var panelGrid = $('.active-menu');


makeGetReq("menu", {}, function (response) {

    $.each(response.categories, function (i) {
        var panelGridCell = $('<div class="panel-grid-cell">').html(
            '<div class="list-menu">' +
            '<h3>' + response.categories[i].name + '</h3>' + '</div>' +
            ' <ul class="list-menu-content "/>')

        .appendTo(panelGrid);

        panelGridCell.find('.list-menu').css("background-image", "url(" + response.categories[i].imageUrl + ")");

        var list = panelGridCell.find('ul');

        $.each(response.categories[i].dishes, function (j) {
            var dishID = response.categories[i].dishes[j].id;
            var dishPrice = response.categories[i].dishes[j].price;
            var currentItem = $('<li class="list-product list-product-active"/>')
                .html('<div class="list-product-title">' + '<span class="dish">' + response.categories[i].dishes[j].name + '</span>' + '<span class="dotted"></span>' + '</div>' +
                    '<div class="list-product-desc">' + '<p class="description">' + response.categories[i].dishes[j].description + '</p>' + '</div>' +
                    '<div class="list-product-price">' + '<span class="price">' + dishPrice + '</span>' + '</div>' +
                    '<div class="clear" />' +
                    '<div class="order-product"><p>make order<p>' + '<div class="counter">' +
                    '<span class="minus"></span>' +
                    '<input class="number_dishes" value="0">' +
                    '<span class="plus"></span>' +
                    '</div>' + '</div>').appendTo(list);


            var currentButton = currentItem.find(".order-product");
            var makeOrderButton = currentButton.find("p");
            var buttonPlus = currentButton.find(".plus");
            var buttonMinus = currentButton.find(".minus");

            makeOrderButton.click(function () {
                makeOrder(dishID, dishPrice, makeOrderButton);
            })
            buttonPlus.click(function () {
                // currentButton.html('<div class="loader"></div>');
                makeOrder(dishID, dishPrice, makeOrderButton);
            });
            buttonMinus.click(function () {
                deleteDishFromOrder(dishID, dishPrice, buttonMinus, makeOrderButton);
            })
            currentItem.attr("id", dishID);
            currentButton.find(".number_dishes").val(0);
        });
    });
});

var totalOrderAmount = 0;
var totalOrderCost = 0;

function getCurrentUserOrders() {
    makeGetReq("users/me/orders", {}, function (response) {
        $.each(response, function (i) {
            var orderedDish = response[i].dishId;
            $("#" + orderedDish + " .order-product").find(".number_dishes").val(response[i].amount)
            $("#" + orderedDish + " .order-product").find(".counter").show();
            $("#" + orderedDish + " .order-product").find("p").hide();
            $("#" + orderedDish + " .order-product").css("background", "#fff");
            totalOrderAmount += response[i].amount;
            totalOrderCost += response[i].amount * response[i].dish.price;
        });
        $(".total-order").val(totalOrderAmount);
        $(".total-cost").val(totalOrderCost);

        //        $.each(response, function (i) {
        //            $('<tr>').html('<td>' + response[i].dish.name + '</td>' + '<td>' + response[i].dish.price + '</td>' + '<td>' + response[i].amount + '</td>' + '<td>' + response[i].dish.price * response[i].amount + '</td>').appendTo($("#tbody"))
        //
        //        })

    })
}