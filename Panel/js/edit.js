$(document).ready(function(){
    $(".edit").mouseenter(function(){
        $(".edit").css({'height':'200px',"-webkit-box-shadow": "0px 0px 10px 10px rgba(133,171,38,1)",
        "-moz-box-shadow": "0px 0px 10px 0px rgba(133,171,38,1)",
        "box-shadow": "0px 0px 10px 0px rgba(133,171,38,1)"}).delay(1000);
        $(".iico").css({"visibility": "visible"});
    });

    $(".edit").mouseleave(function(){
        $(".edit").css({'height':'50px',"-webkit-box-shadow": "none",
        "-moz-box-shadow": "none",
        "box-shadow": "none"});
        $(".iico").css({"visibility": "hidden"});
    });

});
  
