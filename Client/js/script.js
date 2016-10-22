 function order_item_click_handler(item_name) {
     $.ajax({
         type: "POST",
         url: "http://localhost:3001/order/",
         data: JSON.stringify({
             menuItemId: item_name
         }),
         dataType: "json",
         contentType: "application/json; charset=utf-8",

     });

 }

 $(document).ready(function () {

     var panel_grid = $('.active-menu');

     $.ajax({
         url: "http://localhost:3001/menu",
         success: function (response) {


             $.each(response.categories, function (i) {

                 var panel_grid_cell = $('<div class="panel-grid-cell">').html(
                     '<div class="list-menu">' +
                     '<h3>' + response.categories[i].name + '</h3>' + '</div>' +
                     ' <ul class="list-menu-content "/>')

                 .appendTo(panel_grid);

                 var back_img = panel_grid_cell.find('.list-menu').css("background-image", "url(" + response.categories[i].image + ")");

                 var list = panel_grid_cell.find('ul');

                 $.each(response.categories[i].menu, function (j) {

                     var current_item = $('<li class="list-product list-product-active"/>')
                         .html('<div class="list-product-title">' + '<span class="dish">' + response.categories[i].menu[j].name + '</span>' + '<span class="dotted"></span>' + '</div>' +
                             '<div class="list-product-desc">' + '<p class="description">' + response.categories[i].menu[j].description + '</p>' + '</div>' +
                             '<div class="list-product-price">' + '<span class="price">' + response.categories[i].menu[j].price + '</span>' + '</div>' +
                             '<div class="clear" />' +
                             '<span class="order-product">заказать</span>').appendTo(list);

                     var item_name = response.categories[i].menu[j].name;
                     var current_button = current_item.find(".order-product");
                     current_button.click(function () {

                         order_item_click_handler(item_name)
                     });

                 });
             });


         }
     });

 });