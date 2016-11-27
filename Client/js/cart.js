// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
    makeGetReq("users/me/orders", {}, function (response) {
        $("#thead").html("");
        $("#tbody").html("");
        console.log(response.dishId);
        if (!$.isEmptyObject(response)) {
            $('<tr>' + '<th> Dish Name </th>' + '<th> Dish Price </th>' + '<th> Amount </th>' + '<th> Subtotal </th>' + '</tr>').appendTo($("#thead"));
            $.each(response, function (i) {

                $('<tr>').html('<td>' + response[i].dish.name + '</td>' + '<td>' + response[i].dish.price + '</td>' + '<td>' + response[i].amount + '</td>' + '<td>' + response[i].dish.price * response[i].amount + '</td>').appendTo($("#tbody"))
            });
        } else {
            $(".cart-message").html("Cart is empty");

        }

    });
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}