"use strict"

$(".user-profile").hide();
$(".local-info").hide();

$(".signin").click(function () {
    var email = $("#user_email").val();
    var password = $("#user_pwd").val();

    $(".login").hide();
    $(".user-profile").show();
    $(".local-info").show();


    $(".id").text(email);
    $("#password").html(password);

    makePostReq("auth/", {
        username: email,
        password: password
    }, function (data) {
        console.log("Data Loaded: " + data)
    }, function () {
        console.log("Fatal error")
    });

});

$(".logout").click(function () {


    $(".login").show();
    $(".user-profile").hide();
    $(".local-info").hide();

    makeGetReq("logout/", {}, function (data) {
        console.log("Log out")
    });

});

makeGetReq("users/me", {}, function (response) {
    console.log(response.name)
        /*hide login form*/
    $(".login").hide();
    $(".user-profile").show();
    $(".local-info").show();

});