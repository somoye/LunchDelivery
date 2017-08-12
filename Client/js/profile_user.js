"use strict";

var $btn_edit = $("#button_edit_profile"),
    $btn_save = $("#button_save_profile"),
    $btn_cancel = $("#button_cancel_profile");

$($btn_edit).click(function(e) {
    e.preventDefault(); // временно отменяю стандартное поведение submit
    $("input#profile_name, input#profile_password").prop("readonly", false).css({"border": "1px solid #d0d0d0",
                                                                                 "text-align": "left"
                                                                                });
    $("input#profile_password").css({"display": "block"});
    $($btn_save).css({"display": "block"});
    $($btn_cancel).css({"display": "block"});
    $($btn_edit).css({"display": "none"});
});

$($btn_cancel).click(function(e) {
    e.preventDefault(); // временно отменяю стандартное поведение submit
    $("input#profile_name, input#profile_password").prop("readonly", true).css({"border": "none",
                                                                                 "text-align": "center"
                                                                                });
    $("input#profile_password").css({"display": "none"});
    $($btn_save).css({"display": "none"});
    $($btn_cancel).css({"display": "none"});
    $($btn_edit).css({"display": "block"});
});

$($btn_save).click(function(e) {
    e.preventDefault(); // временно отменяю стандартное поведение submit
});