"use strict"

function getUserData() {
    
    makeGetReq("users/me", {}, function (response) {
        console.log(response)

        $(".user-name").html("Hi " + response.name + "!");
        $(".login").hide();
        $("#myBtn").css({"display": "inline-block"});
        getCurrentUserOrders();
<<<<<<< HEAD
        $(".user-name").html("Hi " + response.name + "!");
        $("#profile_name").val(response.name);
=======
        
        if(response.isAdmin) {
            $(".admin-profile").show();
        } else {
            $(".user-profile").show();
        }
>>>>>>> f05faaf1534c62e53b2c6f180a87a9c543b42d9f
    }, function () {
        $(".login").show();
    });
};

getUserData();

function signinOnClick() {
    var email = $("#user_email").val();
    var password = $("#user_pwd").val();
    
    makePostReq("auth/", {
            username: email,
            password: password
        },
        getUserData,
        function () {

            $(".err-panel").html("Your email or password is wrong");

        });

};

$(".signin").click(function () {
    signinOnClick()
});


$(".logout").click(function () {
    $(".login").show();
    $(".user-profile").hide();
    $(".admin-profile").hide();
    $("#myBtn").hide();
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