
var pin_mod=1;
var userEmail=localStorage.getItem("email");
var userPass=localStorage.getItem("pass");
if(userEmail==null||userPass==null||userEmail=="null"||userPass=="null"){
    window.location="login.html"
}
$(document).ready(function(){
    var changing_file = [],recive_data;
    get_all_foodcatogry();
    //get all food catogry
    function get_all_foodcatogry(){
        if(localStorage.getItem("loader")==1){
            $(".loader-content").show();
        }
        $.ajax({
            type: 'POST',
            url: 'http://medvisit.ir/screenMe/api/public/getAllPlateItemCategories',
            data : {email:"4@g.com",pass:"4"},
            success: function(jd){
                recive_data=jd;
                if(jd.code=='200'){
                    for (i = 0; i <jd.result.length; i++) { 
                        var food_id=jd.result[i].id;
                        var food_url="http://medvisit.ir/screenMePic/"+jd.result[i].pic;
                        var serv_item=$('<div class="col-sm-4" id="'+food_id+'" name="'+food_id+'"><div class="serv-item text-center" name="'+food_id+'"><div class="bb" id="plateCateg-contain" name="'+food_id+'"><i class=" animated infinite swing fas fa-times-circle exit2" name="'+food_id+'"></i><textarea rows="1"  id="serv-title'+food_id+'" class="box-input serv-title message-box plateCateg-title" autocomplete="off"></textarea></div></div></div>');
                        serv_item.find(".serv-title").val(jd.result[i].name);
                        $("#main-contain").append(serv_item);
                        $("#output"+food_id).attr("src",food_url);
                        var arr_samp=[0,1,2,0,1,2];
                        var i_mod=i%3;
                        var i_k=(i-i_mod)/3;
                        var index=i_mod+(i_k%3);
                        serv_item.find(".bb").css({"background-image":"url(./img/corner-"+arr_samp[index]+".png)"});
                        if((i+1)%3==0)
                        {
                            var m=Math.max($("#serv-title"+jd.result[i-1].id).get(0).scrollHeight,$("#serv-title"+jd.result[i-2].id).get(0).scrollHeight,$("#serv-title"+jd.result[i].id).get(0).scrollHeight);
                            $("#serv-title"+jd.result[i-2].id).css('min-height',m+ 'px');
                            $("#serv-title"+jd.result[i-1].id).css('min-height', m+ 'px');
                            $("#serv-title"+jd.result[i].id).css('min-height', m+ 'px');
                        }
                        else if(i>=jd.result.length-(jd.result.length%3)){
                            $("#serv-title"+jd.result[i].id).css('min-height',$("#serv-title"+jd.result[i-1].id).get(0).scrollHeight+ 'px');
                            //$("#servv-title"+jd.result[i].foodId).css('min-height',"#servv-title"+jd.result[i].foodId.get(0).scrollHeight+ 'px');                        
                        }
                        
                         serv_item.find(".message-box").on('input', function() {
                            var scroll_height = $(this).get(0).scrollHeight;

                            $(this).css('height', scroll_height + 'px');
                        });
                        //add edit function to dynamic serv-item
                        
                        serv_item.find(".serv-item").on("click", function() {
                            item_selected=$(this).attr("name");
                            localStorage.setItem("plateCategoriesId",item_selected);
                            for(i = 0; i <jd.result.length; i++){
                                if(jd.result[i].id==item_selected){
                                    var dsd=jd.result[i].name;
                                    localStorage.setItem("platecategoryName",dsd );
                                    localStorage.setItem("loader",1);
                                    window.location="PlateItems.html";
                                }
                            }
                        });
                        serv_item.find(".exit2").on("click", function() {
                            item_selected=$(this).attr("name");   
                        });
                        $(".loader-content").delay(4000).fadeOut();
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(textStatus);
            } 
        });    
    }

    //side nav
    $("#plate_itm_shadow").addClass( "item_selected_shadow" );
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
        $("#plate_itm_shadow").addClass( "item_selected_shadow" );
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
        $("#plate_itm_shadow").removeClass( "item_selected_shadow" );  
        $("#screenmeIco").css({"float":"left"});      
    }
    function lock_sidenav(x) {
        if (x.matches) { 
            pin_mod=1;
            hid_sidenav();
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

    //media query
    var x = window.matchMedia("(max-width: 500px)");
    lock_sidenav(x) ;
    x.addListener(lock_sidenav) ;
});