 $(document).ready(function () {
     $(".user-profile").hide();
     $(".local-info").hide();

     $(".signin").click(function () {
         $(".login").hide();
         $(".user-profile").show();
         $(".local-info").show();
     });

 });