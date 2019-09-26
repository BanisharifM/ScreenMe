
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
        $(".loader-content").delay(3600).fadeOut();
        $.ajax({
            type: 'POST',
            url: 'http://medvisit.ir/screenMe/api/public/getAllFoodCategories',
            data : {email:"4@g.com",pass:"4"},
            success: function(jd){
                recive_data=jd;
                if(jd.code=='200'){
                    for (i = 0; i <jd.result.length; i++) { 
                        var food_id=jd.result[i].id;
                        var food_url="http://medvisit.ir/screenMePic/"+jd.result[i].pic;
                        var serv_item=$('<div class="col-sm-4" id="'+food_id+'" name="'+food_id+'"><div class="serv-item text-center" name="'+food_id+'"><input  id="upload-img" class="upload-img" type="file" accept="image/*" style="display: none" name="'+food_id+'" /><img class="serv-icon" id="output'+food_id+'"  name="'+jd.result[i].pic+'" /><div class="bb" name="'+food_id+'"><i class=" animated infinite swing fas fa-times-circle exit2" name="'+food_id+'"></i><textarea rows="1"  id="serv-title'+food_id+'" class="box-input serv-title message-box" autocomplete="off"></textarea></div></div></div>');
                        serv_item.find(".serv-title").val(jd.result[i].name);
                        $("#main-contain").append(serv_item);
                        $("#my_image").attr("src","second.jpg");
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
                            if(action_mod==-1){
                                localStorage.setItem("foodCategoriesId",item_selected);
                                for(i = 0; i <jd.result.length; i++){
                                    if(jd.result[i].id==item_selected){
                                        var dsd=jd.result[i].name;
                                        localStorage.setItem("categoryName",dsd );
                                        localStorage.setItem("loader",-1);
                                        window.location="FoodsOfCategory.html";
                                    }
                                }
                            }       
                        });
                        serv_item.find(".exit2").on("click", function() {
                            item_selected=$(this).attr("name");   
                        });
                        $('.upload-img').change(function(){
                            if(action_mod==1)
                                item_selected="-2";
                            var image = document.getElementById("output"+item_selected);
                            uploaded_file=event.target.files[0];
                            
                            image.src = URL.createObjectURL(event.target.files[0]);
                            change_ico=-1;
                            $("#output"+item_selected).attr("name",-5);
                            changing_file[item_selected]=event.target.files[0];
                        });
                        serv_item.find(".serv-icon").on("click", function() {
                            if(food_editable==1){
                                $("#upload-img").trigger("click");
                            }
                        });
                        serv_item.find(".serv-title").on("click", function() {
                            if(food_editable==1){
                                $(this).prop("readonly", false);
                            }
                            else if(food_editable==-1){
                                $(this).prop("readonly", true);   
                            }
                        });
                        serv_item.find(".exit2").on("click", function() {
                            //delete
                            if(action_mod==2){
                                if(!confirm("Are you sure deleting food category"))
                                    return;
                                event.preventDefault();
                                const datas = new FormData();
                                datas.append('email',"4@g.com");
                                datas.append('pass',"4");
                                datas.append('categoryId',item_selected);  
                                $("#cancel").hide();
                                $(".edit").hide();
                                $("#circle-loader").show(); 
                                setTimeout(function() 
                                {
                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://medvisit.ir/screenMe/api/public/deleteFoodCategory',
                                        data : datas,
                                        enctype: 'multipart/form-data',
                                        processData: false,       
                                        contentType: false,
                                        success: function(jd){
                                            result=jd;
                                            if(jd.code=='200'){
                                                localStorage.setItem("loader",0);
                                                $("#circle-loader").hide();
                                                $("#saved").show();
                                                setTimeout(function() 
                                                {   
                                                    window.location="panel.html";
                                                }, 1500);
                                            }
                                        },
                                        error: function(jqXHR, textStatus, errorThrown){
                                            alert(textStatus);
                                            window.location="panel.html";
                                        }
                                        
                                    });
                                },2500);
                            }
                        });
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(textStatus);
            } 
        });    
    }

    //side nav
    $("#food_itm_shadow").addClass( "item_selected_shadow" );
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
        $("#food_itm_shadow").addClass( "item_selected_shadow" );
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
        $("#food_itm_shadow").removeClass( "item_selected_shadow" ); 
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
    
    //food
    var food_editable=-1,food_deletable=-1,food_adding=-1,uploaded_file;
    var result;
    var item_selected,change_ico=0;

    // 0 ->edit   1 ->add  2 ->delete  -1 ->no action
    var action_mod=-1;

    //add food catogry
    $("#iico1").click(function(){
        
        if(food_deletable!=1&&food_editable!=1){
            food_adding*=-1;
            if(food_adding==1){
                $( "#firstiico" ).removeClass( "fa-edit" ).addClass( "fa-plus-square" ).css({"color":"#ff3333"});
                $("#main-contain").append(serv_item_emp);
                action_mod=1;
                item_selected="-2";
                $('#save-txt').text('Add'); 
                $('#saved').text('Added'); 
                $("#save").show();
                $("#cancel").show();
                $("#panel-edit-status").text("/add").css({"color":"#81e097"});
                $('html, body').animate({
                    scrollTop: $("#vc").offset().top
                }, 2000);
                $("#serv-title-2").addClass("textarea-editable");
            }
            else{
                $( "#firstiico" ).removeClass( "fa-plus-square" ).addClass( "fa-edit" ).css({"color":"white"});
                action_mod=-1;
                serv_item_emp.find(".serv-title").val("");
                $( "#vc" ).remove();
                $("#save").hide();
                $("#cancel").hide();
                $("#panel-edit-status").text("");
                localStorage.setItem("loader",0);
                window.location="panel.html";
            }
            
        }
    });

    //delete food catogry
    $("#iico2").click(function(){
        if(food_editable!=1&&food_adding!=1){
            food_deletable*=-1;
            if(food_deletable==1){
                $( "#firstiico" ).removeClass( "fa-edit" ).addClass( "fa-trash-alt" ).css({"color":"#ff3333"});
                action_mod=2;
                $(".exit2").show();
                $("#panel-edit-status").text("/delete").css({"color":"#e2727d"});
                $('#saved').text('Deleted'); 
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
            }
            else{
                $( "#firstiico" ).removeClass( "fa-trash-alt" ).addClass( "fa-edit" ).css({"color":"white"});
                action_mod=-1;
                $(".exit2").hide();
                $("#panel-edit-status").text("");
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            }
        }
    });
    
    //edit food catogry
    $("#iico3").click(function(){
        if(food_deletable!=1&&food_adding!=1){
            food_editable*=-1;
            action_mod=0;
            if(food_editable==1)
            {
                $( "#firstiico" ).removeClass( "fa-edit" ).addClass( "fa-pen" ).css({"color":"#ff3333"});
                $('#save-text').text('Save'); 
                $('#saved').text('Saved'); 
                $("#save").show();
                $("#cancel").show();
                $("#panel-edit-status").text("/edit").css({"color":"rgb(255, 195, 120)"});
                $(".serv-title").addClass("textarea-editable");
            }
            else{
                $( "#firstiico" ).removeClass( "fa-pen" ).addClass( "fa-edit" ).css({"color":"white"});
                $("#save").hide();
                $("#cancel").hide();
                $("#panel-edit-status").text("");
                localStorage.setItem("loader",0);
                window.location="panel.html";
            }
        }
    });

    //cancel editing
    $("#cancel").click(function(){
        if(food_adding==1){
            food_adding*=-1;
            $( "#firstiico" ).removeClass( "fa-plus-square" ).addClass( "fa-edit" ).css({"color":"white"});
            action_mod=-1;
            serv_item_emp.find(".serv-title").val("");
            $( "#vc" ).remove();
            $("#save").hide();
            $("#cancel").hide();
            $("#panel-edit-status").text("");
            localStorage.setItem("loader",0);
            window.location="panel.html";
        }
        else if(food_deletable==1){
            food_deletable*=-1;
            $( "#firstiico" ).removeClass( "fa-trash-alt" ).addClass( "fa-edit" ).css({"color":"white"});
            action_mod=-1;
            $(".exit2").hide();
            $("#panel-edit-status").text("");
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
        }
        else if(food_editable==1){
            food_editable*=-1;
            $( "#firstiico" ).removeClass( "fa-pen" ).addClass( "fa-edit" ).css({"color":"white"});
            $("#save").hide();
            $("#cancel").hide();
            $("#panel-edit-status").text("");
            localStorage.setItem("loader",0);
            window.location="panel.html";
        }
    });
    //add food catogry
    var emp_file;
    var serv_item_emp=$('<div id="vc" class="col-sm-4" name="-2"><div class="serv-item text-center" name="-2"><input  id="upload-img" class="upload-img-2" type="file" accept="image/*" style="display: none" name="-2" /><img class="serv-icon" id="output-2" name="-2" src="http://medvisit.ir/screenMePic/corner-2.png"/><div class="bb" name="-2"><i class=" animated infinite swing fas fa-times-circle exit2" name="-2"></i><textarea  id="serv-title-2" rows="1"  class="box-input serv-title message-box" autocomplete="off" ></textarea></div></div></div>');
    serv_item_emp.find(".serv-icon").on("click", function() {
        $("#upload-img").trigger("click"); 
    });
    serv_item_emp.find(".message-box").on('input', function() {
        var scroll_height = $(this).get(0).scrollHeight;

        $(this).css('height', scroll_height + 'px');
    });
    $('.upload-img-2').change(function(){
        if(action_mod==1)
            item_selected="-2";
        var image = document.getElementById("output"+item_selected);
        uploaded_file=event.target.files[0];
        
        image.src = URL.createObjectURL(event.target.files[0]);
        change_ico=-1;
    });
    serv_item_emp.find(".serv-title").on("click", function() {
        $(this).prop("readonly", false);
    });

    function editing(categoryid,categoryname,categorypic,fileupload){
        event.preventDefault();
        const datas = new FormData();
        datas.append('email',"4@g.com");
        datas.append('pass',"4");
        datas.append('categoryId',categoryid);
        datas.append('categoryName',categoryname);
        datas.append('categoryPic',categorypic);
        datas.append('uploaded_file',fileupload);
        setTimeout(function() 
        {  
            $.ajax({
                type: 'POST',
                url: 'http://medvisit.ir/screenMe/api/public/editFoodCategory',
                data : datas,
                enctype: 'multipart/form-data',
                processData: false,       
                contentType: false,
                success: function(jd){
                    result=jd;
                    if(jd.code=='200'){
                        $("#panel-edit-status").text("");
                        localStorage.setItem("loader",0);
                        $("#circle-loader").hide();
                        $("#saved").show();
                        setTimeout(function() 
                        {   
                            window.location="panel.html";
                        }, 500);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(textStatus);
                }
            
            });
        }, 2500);
    }

    $("#save").on("click", function() {
        //edit
        if(action_mod==0){
            $("#save").hide();
           $("#cancel").hide();
           $(".edit").hide();
           $("#circle-loader").show();
           var edit_flag=0;
            for(i=0;i<recive_data.result.length;i++){
                var temp_item_id=recive_data.result[i].id;
                var temp_item_name=$("#serv-title"+temp_item_id).val();
                var temp_img_name=$("#output"+temp_item_id).attr("name");
                var temp_changico,change_flag=0,fileupload;
                if(temp_item_name==''||temp_item_name==null){
                    continue;
                }
                if(temp_img_name==-5){
                    temp_changico="-1";
                    fileupload=changing_file[temp_item_id];
                    change_flag=1;
            
                }
                else
                    temp_changico=0;
                if(temp_item_name!=recive_data.result[i].name)
                    change_flag=1;
                
                if(change_flag==1){
                    edit_flag=1;
                    editing(temp_item_id,temp_item_name,temp_changico,fileupload);
                }
                else
                    continue;
            }
            if(edit_flag==0){
                $("#panel-edit-status").text("");
                localStorage.setItem("loader",0);
                $("#circle-loader").hide();
                setTimeout(function() 
                {   
                    window.location="panel.html";
                }, 500);
            }
        }
        //add
        else if(action_mod==1){
            //check image
            new_food_title=$("#serv-title-2").val();
            var pic="-1";
            if(uploaded_file==null){
                pic="default_category_pic.jpg"
            }
            else if(new_food_title==null||new_food_title==''){
                alert("add title for new category");
                return;
            }
           $("#save").hide();
            $("#cancel").hide();
            $(".edit").hide();
            $("#circle-loader").show();
            /*$("#saved").show();
            $("#saved").delay(600).fadeOut();*/
            

            $( "#firstiico" ).removeClass( "fa-plus-square" ).addClass( "fa-edit" ).css({"color":"white"});
            event.preventDefault();
            const datas = new FormData();
            datas.append('email',"4@g.com");
            datas.append('pass',"4");
            datas.append('pic',pic);
            datas.append('categoryName',new_food_title);
            datas.append('uploaded_file',uploaded_file);  
            setTimeout(function() 
            {  
                $.ajax({
                    type: 'POST',
                    url: 'http://medvisit.ir/screenMe/api/public/insertFoodCategory',
                    data : datas,
                    enctype: 'multipart/form-data',
                    processData: false,       
                    contentType: false, 
                    success: function(jd){
                        result=jd;
                        if(jd.code=='200'){
                            $("#panel-edit-status").text("");
                            localStorage.setItem("loader",0);
                            $("#circle-loader").hide();
                            $("#saved").show();
                            setTimeout(function() 
                            {   
                                window.location="panel.html";
                            }, 1500);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert(textStatus);
                        window.location="panel.html";
                    }
                
                });
            }, 2500);
        }
    });

    //media query
    var x = window.matchMedia("(max-width: 500px)");
    lock_sidenav(x) ;
    x.addListener(lock_sidenav) ;

});