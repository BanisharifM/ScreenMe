
var userEmail=localStorage.getItem("email");
var userPass=localStorage.getItem("pass");
if(userEmail==null||userPass==null||userEmail=="null"||userPass=="null"){
    window.location="login.html"
}
$(document).ready(function(){
    var changing_file = [],recive_data;
    var recive_data;
    if(localStorage.getItem("loader")==1){
        //$(".loader-content").show();
    }
    $(document).attr("title", localStorage.getItem("categoryName"));
    $("#panel-status2").text("  /"+localStorage.getItem("categoryName"));
    //get foods
    $.ajax({
        type: 'POST',
        url: 'http://medvisit.ir/screenMe/api/public/getFoodsOfCategory',
        data : {email:"4@g.com",pass:"4",categoryId:localStorage.getItem("foodCategoriesId")},
        success: function(jd){
            recive_data=jd;
            if(jd.code=='200'){
                if(jd.result.length==0)
                    $(".loader-content").delay(4000).fadeOut();
                $("#panel-status2").text("/ "+localStorage.getItem("categoryName"));
                for (i = 0; i <jd.result.length; i++) { 
                    var food_id=jd.result[i].foodId;
                    var food_url="http://medvisit.ir/screenMePic/"+jd.result[i].foodPic;
                    var servv_item=$('<div class="col-sm-4 float-left servv-item" id="'+food_id+'" name="'+food_id+'"><div class="servv-item-content" name="'+food_id+'"><i class=" animated infinite swing fas fa-times-circle exit3" style="right:10px;"name="'+food_id+'"></i><div class="ffood"><input  id="upload-img" class="upload-img" type="file" accept="image/*" style="display: none" name="'+food_id+'" /><img class="ffood-img servv-icon" id="output'+food_id+'"  name="'+jd.result[i].pic+'"><div class="ffood-text"><textarea class="ffood-h2 box-input servv-title message-box" rows="1" id="servv-title'+food_id+'"  autocomplete="off" ></textarea><textarea rows="1" class="ffood-p box-input servv-text message-box" id="servv-text'+food_id+'"   autocomplete="off" ></textarea></div></div></div></div>');
                    servv_item.find(".servv-title").val(jd.result[i].foodName);
                    servv_item.find(".servv-text").val(jd.result[i].preparationMethod);
                    $("#main-contain").append(servv_item);
                    $("#output"+food_id).attr("src",food_url);
                    if((i+1)%3==0)
                    {
                        var m=Math.max($("#servv-text"+jd.result[i-2].foodId).get(0).scrollHeight,$("#servv-text"+jd.result[i-1].foodId).get(0).scrollHeight,$("#servv-text"+jd.result[i].foodId).get(0).scrollHeight);
                        $("#servv-text"+jd.result[i-2].foodId).css('min-height',m+ 'px');
                        $("#servv-text"+jd.result[i-1].foodId).css('min-height', m+ 'px');
                        $("#servv-text"+jd.result[i].foodId).css('min-height', m+ 'px');
                        var n=Math.max($("#servv-title"+jd.result[i-2].foodId).get(0).scrollHeight,$("#servv-title"+jd.result[i-1].foodId).get(0).scrollHeight,$("#servv-title"+jd.result[i].foodId).get(0).scrollHeight);
                        $("#servv-title"+jd.result[i-2].foodId).css('min-height',n+ 'px');
                        $("#servv-title"+jd.result[i-1].foodId).css('min-height', n+ 'px');
                        $("#servv-title"+jd.result[i].foodId).css('min-height', n+ 'px');
                    }
                    else if(i>=jd.result.length-(jd.result.length%3)){
                        $("#servv-text"+jd.result[i].foodId).css('min-height',$("#servv-text"+jd.result[i].foodId).get(0).scrollHeight+ 'px');
                        $("#servv-title"+jd.result[i].foodId).css('min-height',$("#servv-title"+jd.result[i].foodId).get(0).scrollHeight+ 'px');
                        //$("#servv-title"+jd.result[i].foodId).css('min-height',"#servv-title"+jd.result[i].foodId.get(0).scrollHeight+ 'px');                        
                    }
                    
                    servv_item.find(".message-box").on('input', function() {
                        var scroll_height = $(this).get(0).scrollHeight;

                        $(this).css('height', scroll_height + 'px');
                    });
                    var textarea = document.querySelector('textarea');
                    textarea.addEventListener('keydown', autosize);        
                    function autosize(){
                    var el = this;
                    setTimeout(function(){
                        el.style.cssText = 'height:auto; padding:0';
                        el.style.cssText = 'height:' + el.scrollHeight + 'px';
                    },0);
                    }
                    //add edit function to dynamic servv-item
                    servv_item.find(".servv-item-content").on("click", function() {
                        item_selected=$(this).attr("name");
                        if(action_mod==-1){
                            localStorage.setItem("foodId",item_selected);
                            for(i = 0; i <jd.result.length; i++){
                                if(jd.result[i].foodId==item_selected){
                                    var dsd=jd.result[i].foodName;
                                    localStorage.setItem("foodName",dsd );
                                    localStorage.setItem("foodId",item_selected );
                                    window.location="foodIngredient.html";
                                }
                            }
                        }   
                    });
                    servv_item.find(".exit3").on("click", function() {
                        item_selected=$(this).attr("name");          
                    });
                    $(".loader-content").delay(4000).fadeOut();
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
                    servv_item.find(".servv-icon").on("click", function() {
                        if(food_editable==1){
                            $("#upload-img").trigger("click"); 
                            var inp_file=document.getElementById(this);
                            uploaded_file=inp_file.files[0]; 
                        }
                    });
                    servv_item.find(".servv-title").on("click", function() {
                        
                    });
                    servv_item.find(".servv-text").on("click", function() {
                        
                    });
                    servv_item.find(".exit3").on("click", function() {
                        //delete
                        if(action_mod==2){
                            if(!confirm("Are you sure deleting food category"))
                                return;
                            event.preventDefault();
                            const datas = new FormData();
                            datas.append('email',"4@g.com");
                            datas.append('pass',"4");
                            datas.append('foodId',item_selected);                              
                            datas.append('foodCategoriesId',localStorage.getItem("foodCategoriesId"));
                            $("#cancel").hide();
                            $(".edit").hide();
                            $("#circle-loader").show(); 
                            setTimeout(function() 
                            {                              
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://medvisit.ir/screenMe/api/public/deleteFoodForCategory',
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
                                                window.location="FoodsOfCategory.html";
                                            }, 1000);
                                        }
                                        else if(jd.code=='100'){
                                            alert(jd.msg);
                                             window.location="FoodsOfCategory.html";
                                        }
                                    },
                                    error: function(jqXHR, textStatus, errorThrown){
                                        alert(textStatus);
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
    
    var pin_mod=0;
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
    
    //food
    var food_editable=-1,food_deletable=-1,food_adding=-1,uploaded_file;
    var result;
    var item_selected,change_ico=0;

    // 0 ->edit   1 ->add  2 ->delete  -1 ->no action
    var action_mod=-1;

    //add food catogry botton
    $("#iico1").click(function(){
        
        if(food_deletable!=1&&food_editable!=1){
            food_adding*=-1;
            if(food_adding==1){
                $( "#firstiico" ).removeClass( "fa-edit" ).addClass( "fa-plus-square" ).css({"color":"#ff3333"});
                $("#main-contain").append(servv_item_emp);
                var textarea = document.querySelector('textarea');
                textarea.addEventListener('keydown', autosize);        
                function autosize(){
                var el = this;
                setTimeout(function(){
                    el.style.cssText = 'height:auto; padding:0';
                    el.style.cssText = 'height:' + el.scrollHeight + 'px';
                },0);
                }
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
                $("#servv-text-2").addClass("textarea-editable");
                $("#servv-title-2").addClass("textarea-editable");
            }
            else{
                $( "#firstiico" ).removeClass( "fa-plus-square" ).addClass( "fa-edit" ).css({"color":"white"});
                action_mod=-1;
                servv_item_emp.find(".servv-title").val("");
                servv_item_emp.find(".servv-text").val("");
                $( "#vc" ).remove();
                $("#save").hide();
                $("#cancel").hide();
                $("#panel-edit-status").text("");
                localStorage.setItem("loader",0);
                window.location="FoodsOfCategory.html";
            }
            
        }
    });

    //delete food catogry button
    $("#iico2").click(function(){
        if(food_editable!=1&&food_adding!=1){
            food_deletable*=-1;
            if(food_deletable==1){
                $( "#firstiico" ).removeClass( "fa-edit" ).addClass( "fa-trash-alt" ).css({"color":"#ff3333"});
                action_mod=2;
                $(".exit3").show();
                $('#saved').text('Deleted'); 
                $("#panel-edit-status").text("/delete").css({"color":"#e2727d"});
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
            }
            else{
                $( "#firstiico" ).removeClass( "fa-trash-alt" ).addClass( "fa-edit" ).css({"color":"white"});
                action_mod=-1;
                $(".exit3").hide();
                $("#panel-edit-status").text("");
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            }
        }
    });
    
    //edit food catogry button
    $("#iico3").click(function(){
        if(food_deletable!=1&&food_adding!=1){
            food_editable*=-1;
            action_mod=0;
            if(food_editable==1)
            {
                $( "#firstiico" ).removeClass( "fa-edit" ).addClass( "fa-pen" ).css({"color":"#ff3333"});
                $('#save-txt').text('Save'); 
                $('#saved').text('Saved'); 
                $("#save").show();
                $("#cancel").show();
                $("#panel-edit-status").text("/edit").css({"color":"rgb(255, 195, 120)"});
                $(".servv-text").addClass("textarea-editable");
                $(".servv-title").addClass("textarea-editable");
            }
            else{
                $( "#firstiico" ).removeClass( "fa-pen" ).addClass( "fa-edit" ).css({"color":"white"});
                $("#save").hide();
                $("#cancel").hide();
                $("#panel-edit-status").text("");
                localStorage.setItem("loader",0);
                window.location="FoodsOfCategory.html";
            }
        }
    });

    //cancel editing button
    $("#cancel").click(function(){
        if(food_adding==1){
            food_adding*=-1;
            $( "#firstiico" ).removeClass( "fa-plus-square" ).addClass( "fa-edit" ).css({"color":"white"});
            action_mod=-1;
            servv_item_emp.find(".servv-title").val("");
            servv_item_emp.find(".servv-text").val("");
            $( "#vc" ).remove();
            $("#save").hide();
            $("#cancel").hide();
            $("#panel-edit-status").text("");
            localStorage.setItem("loader",0);
            window.location="FoodsOfCategory.html";
        }
        else if(food_deletable==1){
            food_deletable*=-1;
            $( "#firstiico" ).removeClass( "fa-trash-alt" ).addClass( "fa-edit" ).css({"color":"white"});
            action_mod=-1;
            $(".exit3").hide();
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
            window.location="FoodsOfCategory.html";
        }
    });
    
    //add food catogry set template
    var emp_file;
    
    var servv_item_emp=$('<div class="col-sm-4 servv-item" id="vc" name="-2"><div class="servv-item-content" name="-2"><i class=" animated infinite swing fas fa-times-circle exit3" name="-2"></i><div class="ffood"><input  id="upload-img" class="upload-img-2" type="file" accept="image/*" style="display: none" name="-2" /><img class="ffood-img servv-icon" id="output-2"  name="-2"><div class="ffood-text"><textarea class="ffood-h2 box-input servv-title message-box" id="servv-title-2" rows="1" autocomplete="off"></textarea><textarea class="ffood-p box-input servv-text message-box" id="servv-text-2"  autocomplete="off" ></textarea></div></div></div></div>');
    servv_item_emp.find(".servv-icon").on("click", function() {
        $("#upload-img").trigger("click"); 
    });
    servv_item_emp.find(".message-box").on('input', function() {
        var scroll_height = $(this).get(0).scrollHeight;

        $(this).css('height', scroll_height + 'px');
    });
    servv_item_emp.find('.upload-img-2').change(function(){
        if(action_mod==1)
            item_selected="-2";
        var image = document.getElementById("output"+item_selected);
        uploaded_file=event.target.files[0];
        image.src = URL.createObjectURL(event.target.files[0]);
        change_ico=-1;
    });
    servv_item_emp.find(".servv-title").on("click", function() {
        $(this).prop("readonly", false);
    });
    servv_item_emp.find(".servv-text").on("click", function() {
    });

    function editing(foodid,foodtitle,foodtext,foodpic,fileupload){
        event.preventDefault();
        const datas = new FormData();
        datas.append('email',"4@g.com");
        datas.append('pass',"4");
        datas.append('foodId', foodid);
        datas.append('foodName',foodtitle);
        datas.append('preparationMethod',foodtext);
        datas.append('foodCategoriesId', localStorage.getItem("foodCategoriesId"));
        datas.append('oldFoodCategoriesId', localStorage.getItem("foodCategoriesId"));
        datas.append('foodPic',foodpic);
        datas.append('uploaded_file',fileupload);
        setTimeout(function() 
        {  
            $.ajax({
                type: 'POST',
                url: 'http://medvisit.ir/screenMe/api/public/editFoodForCategory',
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
                            window.location="FoodsOfCategory.html";
                        }, 1500);
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
                var temp_item_id=recive_data.result[i].foodId;
                var temp_item_title=$("#servv-title"+temp_item_id).val();
                var temp_item_text=$("#servv-text"+temp_item_id).val();
                var temp_img_name=$("#output"+temp_item_id).attr("name");
                var temp_changico,change_flag=0,fileupload;
                if(temp_item_title==''||temp_item_title==null||temp_item_text==''||temp_item_text==null)
                    continue;
                if(temp_img_name==-5){
                    temp_changico="-1";
                    fileupload=changing_file[temp_item_id];
                    change_flag=1;
                }
                else
                    temp_changico=recive_data.result[i].foodPic;
                if(temp_item_title!=recive_data.result[i].foodName||temp_item_text!=recive_data.result[i].preparationMethod)
                    change_flag=1;
                
                if(change_flag==1){
                    edit_flag=1;
                    editing(temp_item_id,temp_item_title,temp_item_text,temp_changico,fileupload);
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
                    window.location="FoodsOfCategory.html";
                }, 500);
            }
        }
        //add 
        else if(action_mod==1){
            //check image
            new_food_title=$("#servv-title-2").val();
            new_food_text=$("#servv-text-2").val();

            pic="-1"
            if(uploaded_file==null){
                //set default pic
                pic="default_food_pic.jpg"
            }
            else if(new_food_title==null||new_food_title==''){
                alert("add name for new food");
                return;
            }
            else if(new_food_text==null||new_food_text==''){
                alert("add preparationMethod for new food");
                return;
            }
            $("#save").hide();
            $("#cancel").hide();
            $(".edit").hide();
            $("#circle-loader").show();
            $( "#firstiico" ).removeClass( "fa-plus-square" ).addClass( "fa-edit" ).css({"color":"white"});
            event.preventDefault();
            const datas = new FormData();
            datas.append('email',"4@g.com");
            datas.append('pass',"4");
            datas.append('name',new_food_title);
            datas.append('preparationMethod',new_food_text);
            datas.append('foodCategoriesId', localStorage.getItem("foodCategoriesId"));
            datas.append('pic',pic);
            datas.append('uploaded_file',uploaded_file);  
            setTimeout(function() 
            {
                $.ajax({
                    type: 'POST',
                    url: 'http://medvisit.ir/screenMe/api/public/insertFoodForCategory',
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
                                window.location="FoodsOfCategory.html";
                            }, 1500);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert(textStatus);
                    }
                
                });
            },2500);
        }
    });

    //media query
    var x = window.matchMedia("(max-width: 500px)");
    lock_sidenav(x) ;
    x.addListener(lock_sidenav) ;

});