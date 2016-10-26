"use strict"

$(".user-profile").hide();
$(".local-info").hide();

$(".signin").click(function () {
    var email = $("#user_email").val();
    var password = $("#user_pwd").val();

    $(".login").hide();
    $(".user-profile").show();
    $(".local-info").show();

    console.log()
    $(".id").text(email);
    $("#password").html(password);

    $.ajax({
        url: "http://localhost:3001/auth",
        method: "POST",
        data: {
            email: email,
            pwd: password
        };
    })
});