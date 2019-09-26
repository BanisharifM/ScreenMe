$(".loader-content").show();
$(".loader-content").delay(4000).fadeOut();
$(document).ready(function(){

    alert(localStorage.getItem("pass"));
    get_all_foodcatogry();
    //get all food catogry
    function get_all_foodcatogry(){
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
                        var serv_item=$('<div class="col-sm-4" id="'+food_id+'" name="'+food_id+'"><div class="serv-item text-center" name="'+food_id+'"><input  id="upload-img" class="upload-img" type="file" accept="image/*" style="display: none" name="'+food_id+'" /><img class="serv-icon" id="output'+food_id+'"  name="'+jd.result[i].pic+'" /><div class="bb" name="'+food_id+'"><i class=" animated infinite swing fas fa-times-circle exit2" name="'+food_id+'"></i><input  id="serv-title'+food_id+'" type="text" class="box-input serv-title" autocomplete="off" readonly="readonly"></div></div></div>');
                        serv_item.find(".serv-title").val(jd.result[i].name);
                        $("#main-contain").append(serv_item);
                        $("#my_image").attr("src","second.jpg");
                        $("#output"+food_id).attr("src",food_url);
                        
                        //add edit function to dynamic serv-item
                        
                        serv_item.find(".serv-item").on("click", function() {
                            item_selected=$(this).attr("name");
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
                        });
                        serv_item.find(".serv-icon").on("click", function() {
                            if(food_editable==1){
                                $("#upload-img").trigger("click"); 
                                var inp_file=document.getElementById(this);
                                uploaded_file=inp_file.files[0]; 
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
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://medvisit.ir/screenMe/api/public/deleteFoodCategory',
                                    data : datas,
                                    enctype: 'multipart/form-data',
                                    processData: false, // tell jQuery not to process the data
                                    contentType: false,
                                    success: function(jd){
                                        result=jd;
                                        if(jd.code=='200'){
                                            window.location="panel.html";
                                        }
                                    },
                                    error: function(jqXHR, textStatus, errorThrown){
                                        alert(textStatus);
                                    }
                                    
                                });
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
    
    var pin_mod=0;
   /* if(login==null){
        login=-1;
        window.location="login.html";
    }*/

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
    }
    function lock_sidenav(x) {
        if (x.matches) { 
            pin_mod=1;
            hid_sidenav()
        } else {
            pin_mod=0;
        }
    }

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
                $('#save').text('Add'); 
                $('#saved').text('Added'); 
                $("#save").show();
                $("#panel-edit-status").text("/add");
            }
            else{
                $( "#firstiico" ).removeClass( "fa-plus-square" ).addClass( "fa-edit" ).css({"color":"white"});
                action_mod=-1;
                serv_item_emp.find(".serv-title").val("");
                $( "#vc" ).remove();
                $("#save").hide();
                $("#panel-edit-status").text("");
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
                $("#panel-edit-status").text("/delete");
            }
            else{
                $( "#firstiico" ).removeClass( "fa-trash-alt" ).addClass( "fa-edit" ).css({"color":"white"});
                action_mod=-1;
                $(".exit2").hide();
                $("#panel-edit-status").text("");
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
                $('#save').text('Save'); 
                $('#saved').text('Saved'); 
                $("#save").show();
                $("#panel-edit-status").text("/edit");
            }
            else{
                $( "#firstiico" ).removeClass( "fa-pen" ).addClass( "fa-edit" ).css({"color":"white"});
                $("#save").hide();
                $("#panel-edit-status").text("");
                window.location="panel.html";
            }
        }
    });

    //add food catogry
    var emp_file;
    var serv_item_emp=$('<div id="vc" class="col-sm-4" name="-2"><div class="serv-item text-center" name="-2"><input  id="upload-img" class="upload-img-2" type="file" accept="image/*" style="display: none" name="-2" /><img class="serv-icon" id="output-2" name="-2" /><div class="bb" name="-2"><i class=" animated infinite swing fas fa-times-circle exit2" name="-2"></i><input  id="serv-title-2" type="text" class="box-input serv-title" autocomplete="off" readonly="readonly"></div></div></div>');
    serv_item_emp.find(".serv-icon").on("click", function() {
        $("#upload-img").trigger("click"); 
    });
    serv_item_emp.find(".serv-title").on("click", function() {
        $(this).prop("readonly", false);
    });


    

    

    $(".save-animate").on("click", function() {
        //edit
        if(action_mod==0){
            $("#save").hide();
            $("#saved").show();
            $( "#firstiico" ).removeClass( "fa-pen" ).addClass( "fa-edit" ).css({"color":"white"});
            event.preventDefault();
            const datas = new FormData();
            datas.append('email',"4@g.com");
            datas.append('pass',"4");
            datas.append('categoryId',item_selected);
            datas.append('categoryName',$("#serv-title"+item_selected).val());
            if(change_ico==-1){
                datas.append('categoryPic','-1');
                datas.append('uploaded_file',uploaded_file);
            }   
            else{
                datas.append('categoryPic',0);
            }                                
            $.ajax({
                type: 'POST',
                url: 'http://medvisit.ir/screenMe/api/public/editFoodCategory',
                data : datas,
                enctype: 'multipart/form-data',
                processData: false, // tell jQuery not to process the data
                contentType: false,
                success: function(jd){
                    result=jd;
                    if(jd.code=='200'){
                        $("#saved").delay(400).fadeOut();
                        $("#panel-edit-status").text("");
                        food_editable=-1;
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(textStatus);
                }
            
            });
        }
        //add
        else if(action_mod==1){
            //check image
            new_food_title=$("#serv-title-2").val();
            if(uploaded_file==null){
                alert("pleas chose picture");
                return;
            }
            else if(new_food_title==null||new_food_title==''){
                alert("add title for new category");
                return;
            }
            $("#save").hide();
            $("#saved").show();
            $("#saved").delay(600).fadeOut();
            $( "#firstiico" ).removeClass( "fa-plus-square" ).addClass( "fa-edit" ).css({"color":"white"});
            event.preventDefault();
            const datas = new FormData();
            datas.append('email',"4@g.com");
            datas.append('pass',"4");
            datas.append('categoryName',new_food_title);
            datas.append('uploaded_file',uploaded_file);    
            $.ajax({
                type: 'POST',
                url: 'http://medvisit.ir/screenMe/api/public/insertFoodCategory',
                data : datas,
                enctype: 'multipart/form-data',
                processData: false, // tell jQuery not to process the data
                contentType: false, 
                success: function(jd){
                    result=jd;
                    if(jd.code=='200'){
                        $("#panel-edit-status").text("");
                        window.location="panel.html";
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(textStatus);
                }
            
            });
        }
    });

    //variable defined
    



    //media query
    var x = window.matchMedia("(max-width: 500px)");
    lock_sidenav(x) ;
    x.addListener(lock_sidenav) ;

   
});

//check image valid format and size
    /*else if(file==null){
        alert("chose an image pleas");
        return;
    }
    else if(!(file.type=="image/jpeg"||file.type=="image/jpg"||file.type=="image/png"))
    {
        alert("chose valid image format");
        return;
    }
    else if(file.size>300000000)
    {
        alert("file is too large");
        return;
    }*/

