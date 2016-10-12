$(document).ready(function () {

    var panel_grid = $('.active-menu');

    $.ajax({
        url: "http://localhost:3001/menu",
        success: function (response) {


            $.each(response.categories, function (i) {

                $('<div class="panel-grid-cell">').html(
                    '<div class="list-menu">' +
                    '<h3>' + response.categories[i].name + '</h3>' + '</div>' +
                    ' <ul class="list-menu-content ' + response.categories[i].name + '"/>').appendTo(panel_grid);

                var list = $('.' + response.categories[i].name);
                $.each(response.categories[i].menu, function (j) {
                    console.log(list);


                    $('<li class="list-product list-product-active"/>')
                        .html('<div class="list-product-title">' + '<span class="dish">' + response.categories[i].menu[j].name + '</span>' + '<span class="dotted"></span>' + '</div>' +
                            '<div class="list-product-desc">' + '<p class="description">' + response.categories[i].menu[j].description + '</p>' + '</div>' +
                            '<div class="list-product-price">' + '<span class="price">' + response.categories[i].menu[j].price + '</span>' + '</div>' +
                            '<div class="clear" />' +
                            '<span class="order-product">заказать</span>').appendTo(list);


                });
            });

        }
    });

});