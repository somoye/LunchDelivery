$(document).ready(function () {

    var panel_grid = $('.active-menu');

    $.ajax({
        url: "http://localhost:3001/menu",
        success: function (response) {
            var category = $(response.categories).filter(function (i, n) {
                return n.name === 'soup'
            });

            $.each(response.categories, function (i) {

                $('<div class="panel-grid-cell">').html(
                    '<div class="list-menu">' +
                    '<h3>' + category[i] + '</h3>' + '</div>' +

                    ' <ul class="list-menu-content"/>').appendTo(panel_grid);
                $('.list-menu-content').addClass(category[i].name);

            });
            var list_soup = $('.soup');



            $.each(category, function (j) {

                $.each(category[j].menu, function (i) {
                    $('<li class="list-product list-product-active"/>')
                        .html('<div class="list-product-title"/>' +
                            '<div class="list-product-desc"/>' +
                            '<div class="list-product-price"/>' +
                            '<div class="clear" />' +
                            '<span class="order-product">заказать</span>').appendTo(list_soup);


                    $(".list-product-title").eq(i).html(
                        '<span class="dish">' + category[j].menu[i].name + '</span>' +
                        '<span class="dotted"></span>'
                    );
                    $(".list-product-desc").eq(i).html('<p class="description">' + category[j].menu[i].description + '</p>');
                    $(".list-product-price").eq(i).html('<span class="price">' + category[j].menu[i].price + '</span>');

                });
            });
        }
    });

});