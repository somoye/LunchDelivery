function orderItemClickHandler(dishID, currentButton) {
    makePostReq("users/me/orders", {
        dishId: dishID
    }, function () {
        var totalAmont = +currentButton.attr("total-amount") + 1;
        console.log(totalAmont);
        currentButton.html('Ordered: ' + totalAmont);
        currentButton.attr("total-amount", totalAmont);
    }, function () {
        alert('Please log in');
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
                    '<span class="order-product">make order</span>').appendTo(list);

            var dishID = response.categories[i].dishes[j].id;
            var currentButton = currentItem.find(".order-product");
            currentButton.click(function () {

                // currentButton.html('<div class="loader"></div>');
                orderItemClickHandler(dishID, currentButton);


            });
            currentItem.attr("id", dishID);

            currentButton.attr("total-amount", 0);

        });
    });
});

function getCurrentUserOrders() {
    makeGetReq("users/me/orders", {}, function (response) {
        $.each(response, function (i) {
            var orderedDish = response[i].dishId;
            console.log("ID" + response[i].amount);
            $("#" + orderedDish + " .order-product").html("Ordered:" + response[i].amount);
            $("#" + orderedDish + " .order-product").attr("total-amount", response[i].amount);
        });
    })
}