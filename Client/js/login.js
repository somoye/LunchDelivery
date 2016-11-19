"use strict"
makeGetReq("users/me", {}, function (response) {
    $(".user-profile").show();
    $(".login").hide();
    getCurrentUserOrders();
}, function () {
    $(".login").show();
});

function signinOnClick() {
    var email = $("#user_email").val();
    var password = $("#user_pwd").val();

    makePostReq("auth/", {
        username: email,
        password: password
    }, function (data) {
        console.log("Data Loaded: " + data)
        $(".login").hide();
        $(".user-profile").show();
        getCurrentUserOrders();
    }, function () {

        $(".err-panel").html("Your email or password is wrong");

    });

};

$(".signin").click(function () {
    signinOnClick()
});


$(".logout").click(function () {
    $(".login").show();
    $(".user-profile").hide();
    makeGetReq("logout/", {}, function (data) {
        console.log("Log out")

        $(".order-product").find(".number_dishes").attr("value", 0)
        $(".order-product").find(".counter").hide();
        $(".order-product").find("p").show();
        $(".order-product").css("background", "#ffb606")

    });
});

$("#user_pwd").keypress(function (event) {
    if (event.keyCode === 13) {
        signinOnClick();
    }
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
});