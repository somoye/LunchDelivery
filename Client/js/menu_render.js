function makeOrder(dishID, makeOrderButton) {
    makePostReq("users/me/orders", {
        dishId: dishID
    }, function () {
        var dishAmont = makeOrderButton.parent().find(".number_dishes");

        makeOrderButton.parent().find(".counter").show();//show counter
        makeOrderButton.hide();
        makeOrderButton.parent().css("background","#fff");
        var totalAmont = Number(dishAmont.val()) + 1;
        dishAmont.val(totalAmont);

    });
};

function addDishToOrder(dishID, buttonPlus) {
    makePostReq("users/me/orders", {
        dishId: dishID
    }, function () {
        var dishAmont = buttonPlus.parent().find(".number_dishes");

      //  buttonPlus.parent().show();//show counter
        //buttonPlus.parent().find("p").hide();
        var totalAmont = Number(dishAmont.attr("value")) + 1;
        dishAmont.attr("value", totalAmont);

    });
};

function deleteDishFromOrder(dishID, buttonMinus) {
    makeDeleteReq("users/me/orders", {
        dishId: dishID
    }, function () {
        var dishAmont = buttonMinus.parent().find(".number_dishes");
        console.log(totalAmont);

        //buttonMinus.parent().show();
       // buttonMinus.parent().find("p").hide();
        var totalAmont = Number(dishAmont.attr("value")) - 1;
        dishAmont.attr("value", totalAmont);

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

            var currentItem = $('<li class="list-product list-product-active"/>')
                .html('<div class="list-product-title">' + '<span class="dish">' + response.categories[i].dishes[j].name + '</span>' + '<span class="dotted"></span>' + '</div>' +
                    '<div class="list-product-desc">' + '<p class="description">' + response.categories[i].dishes[j].description + '</p>' + '</div>' +
                    '<div class="list-product-price">' + '<span class="price">' + response.categories[i].dishes[j].price + '</span>' + '</div>' +
                    '<div class="clear" />' +
                    '<div class="order-product"><p>make order<p>' + '<div class="counter">' +
                    '<span class="minus"></span>' +
                    '<input class="number_dishes" value="0">' +
                    '<span class="plus"></span>' +
                    '</div>' + '</div>').appendTo(list);

            var dishID = response.categories[i].dishes[j].id;
            var currentButton = currentItem.find(".order-product");
            var makeOrderButton = currentButton.find("p");
            var buttonPlus = currentButton.find(".plus");
            var buttonMinus = currentButton.find(".minus");

makeOrderButton.click(function(){
    makeOrder(dishID, makeOrderButton);
})


            buttonPlus.click(function () {

                // currentButton.html('<div class="loader"></div>');
                addDishToOrder(dishID, buttonPlus);


            });
            buttonMinus.click(function() {
                deleteDishFromOrder(dishID, buttonMinus);
            })
            currentItem.attr("id", dishID);
            currentButton.find(".number_dishes").attr("value", 0)

        });
    });
});

function getCurrentUserOrders() {
    makeGetReq("users/me/orders", {}, function (response) {
        $.each(response, function (i) {
            var orderedDish = response[i].dishId;
            console.log("hi");
            $("#" + orderedDish + " .order-product").find(".number_dishes").attr("value", response[i].amount)
            $("#" + orderedDish + " .order-product").find(".counter").show();
            $("#" + orderedDish + " .order-product").find("p").hide();
            $("#" + orderedDish + " .order-product").css("background", "#fff")
        });
    })
}