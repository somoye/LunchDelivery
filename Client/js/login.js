"use strict"
makeGetReq("users/me", {}, function (response) {
    console.log(response.name)
        /*hide login form*/

    $(".user-profile").show();
    $(".login").hide();

}, function () {
    $(".login").show();
});



$(".signin").click(function () {
    var email = $("#user_email").val();
    var password = $("#user_pwd").val();

    makePostReq("auth/", {
        username: email,
        password: password
    }, function (data) {
        console.log("Data Loaded: " + data)
        $(".login").hide();
        $(".user-profile").show();
    }, function () {
        alert("Your email or password is wrong")
    });

});

$(".logout").click(function () {
    $(".login").show();
    $(".user-profile").hide();

    makeGetReq("logout/", {}, function (data) {
        console.log("Log out")
    });

});

makeGetReq("users/me/orders", {}, function (response) {
    $.each(response, function (i) {
        console.log(response[i].dishId);
    });


})