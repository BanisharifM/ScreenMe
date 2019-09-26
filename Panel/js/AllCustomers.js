
var userEmail=localStorage.getItem("email");
var userPass=localStorage.getItem("pass");
if(userEmail==null||userPass==null||userEmail=="null"||userPass=="null"){
    window.location="login.html"
}
$(document).ready(function(){
    $(document).attr("title","All Customers");
    //get foods
    $.ajax({
        type: 'POST',
        url: 'http://medvisit.ir/screenMe/api/public/getAllCustomers',
        data : {email:"4@g.com",pass:"4",offset:"0",limit:"40"},
        success: function(jd){
            recive_data=jd;
            if(jd.code=='200'){
                for (i = 0; i <jd.result.length; i++) { 
                    var user_item=$('<tr id="ddd" class="user-rows"name="'+jd.result[i]['customer id']+'"><th class="user-id user-row table-bordered" name="'+jd.result[i]['customer id']+'" scope="row"></th><td class="user-surname user-row" name="'+jd.result[i]['customer id']+'"></td><td class="user-firstname user-row" name="'+jd.result[i]['customer id']+'"></td><td class="user-email user-row" name="'+jd.result[i]['customer id']+'"></td><td class="user-kit-status user-row" name="'+jd.result[i]['customer id']+'"></td></tr>')
                    user_item.find(".user-id").html(i+1);
                    user_item.find(".user-surname").html(jd.result[i].surName );
                    user_item.find(".user-firstname").html(jd.result[i].firstName );
                    user_item.find(".user-email").html(jd.result[i].email );
                    user_item.find(".user-kit-status").html(jd.result[i]['kit status'] );
                    $("#user-table-contain").append(user_item);

                    user_item.find(".user-row").on("click", function() {
                        user_selected=$(this).attr("name");
                        for(j=0;j<jd.result.length;j++){
                            if(user_selected==jd.result[j]['customer id']){
                                localStorage.setItem("firstName",jd.result[j].firstName);
                                localStorage.setItem("surName",jd.result[j].surName);
                                localStorage.setItem("usersEmail",jd.result[j].email);
                                localStorage.setItem("kitStatus",jd.result[j]['kit status']);
                                localStorage.setItem("userPic",jd.result[j].pic);
                                localStorage.setItem("userAddress",jd.result[j].address);
                                localStorage.setItem("userPostalCode",jd.result[j].postalCode);
                            }
                        }
                        localStorage.setItem("userId",user_selected);
                        window.location="customer.html";
                    });
                    
                    $(".user-rows").mouseenter(function(){
                        $(this).css({"cursor":"pointer" ,"background-color":"rgb(216, 232, 224)"})
                    });
                    $(".user-rows").mouseleave(function(){
                        $("tr:even.user-rows").css("background-color", "white");
                        $("tr:odd.user-rows").css("background-color", "#f9f9f9");
                    });
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(textStatus);
        } 
    });   
    
    var pin_mod=0;
    //side nav
    $("#user_itm_shadow").addClass( "item_selected_shadow" );
    $(".sidenav").mouseenter(function(){
        if(pin_mod==0){
           show_sidenav()
        }
    });
    $(".sidenav").mouseleave(function(){
        if(pin_mod==0){
            hid_sidenav()
        }
    });
    $("#pin-ico").click(function(){
        pin_mod=1;
        $("#pin-ico").hide();
        $("#unpin-ico").css('visibility', 'visible');
        $("#unpin-ico").show();
    });
    $("#unpin-ico").click(function(){
        pin_mod=0;
        $("#pin-ico").css('visibility', 'visible');
        $("#pin-ico").show();
        $("#unpin-ico").hide();
    });
    function hid_sidenav(){
        $(".navbarr").css({"left":"45px"});
        $(".sidenav").css({"left":"-190px"});
        $(".navitem").css({"margin-left":"175px"});
        $(".nav-title").css({"color":"#111"});
        $("#pin-ico").css('visibility', 'hidden');
        $("#unpin-ico").css('visibility', 'hidden');
        $("#main").css({'margin-left':'120px','margin-right': '120px'});
        $(".txt").hide();
        $("#user_itm_shadow").addClass( "item_selected_shadow" );
        $("#screenmeIco").css({"float":"right"});
    }
    function show_sidenav(){
        $(".sidenav").css({"left":"0"});
        $(".navbarr").css({"left":"235px"});
        $(".navitem").css({"margin-left":"7px"});
        $(".nav-title").css({"color":"#333"});
        $("#pin-ico").css('visibility', 'visible');
        $("#unpin-ico").css('visibility', 'hidden');
        $("#main").css({'margin-left':'250px','margin-right':'10px'});        
        $(".txt").fadeIn(500);
        $("#user_itm_shadow").removeClass( "item_selected_shadow" ); 
        $("#screenmeIco").css({"float":"left"});       
    }
    function lock_sidenav(x) {
        if (x.matches) { 
            pin_mod=1;
            hid_sidenav()
        } else {
            pin_mod=0;
        }
    }
    $("#food").click(function(){
        window.location="panel.html";
    });
        
    $("#user").click(function(){
        window.location="AllCustomers.html";
    });

    $("#activity").click(function(){
        window.location="Activity.html";
    });

    $("#plate").click(function(){
        window.location="plateItemCategory.html";
    });
    
    $("#exit").click(function(){
        localStorage.setItem("email",null);
        localStorage.setItem("pass",null);
        window.location="login.html"
    });
    
    //variable defined
    
    $("#userSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#user-table-contain tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

    //media query
    var x = window.matchMedia("(max-width: 500px)");
    lock_sidenav(x) ;
    x.addListener(lock_sidenav) ;

});