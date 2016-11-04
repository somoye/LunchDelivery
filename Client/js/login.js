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
        email: email,
        pwd: password
    }, function (data) {
        alert("Data Loaded: " + data)
    }, function () {
        alert("Fatal error")
    });

});

makeGetReq("user/", {}, function (response) {
    alert(response.name)
        /*hide login form*/
})