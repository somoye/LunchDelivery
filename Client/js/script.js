$(document).ready(function () {
    var list = $('.list-menu-content');

    $.ajax({
        url: "http://localhost:3001/menu",
        success: function (response) {

            $.each(response.data, function (i) {
                $('<li class="list-product list-product-active"/>')
                    .html('<div class="list-product-title"/>' + '<div class="list-product-desc"/>' + '<div class="list-product-price"/>' + '<div class="clear" />' + '<span class="order-product">заказать</span>').appendTo(list)


                $(".list-product-title").eq(i).html(
                    '<span class="dish">' + response.data[i].name + '</span>' +
                    '<span class="dotted"></span>'
                );
                $(".list-product-desc").eq(i).html('<p class="description">' + response.data[i].description + '</p>');
                $(".list-product-price").eq(i).html('<span class="price">' + response.data[i].price + '</span>');

            });
        }
    });

});