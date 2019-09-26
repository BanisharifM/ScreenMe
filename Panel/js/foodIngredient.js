
var userEmail=localStorage.getItem("email");
var userPass=localStorage.getItem("pass");
if(userEmail==null||userPass==null||userEmail=="null"||userPass=="null"){
    window.location="login.html"
}
$(document).ready(function(){
    
    var food_name=localStorage.getItem("foodName");
    var food_info,allFoodCategory, allIngredientFood;

    //get food info
    $.ajax({
        type: 'POST',
        url: 'http://medvisit.ir/screenMe/api/public/getFoodsInfo',
        data : {email:"4@g.com",pass:"4",foodId:localStorage.getItem("foodId")},
        success: function(jd){
            food_info=jd;
            if(jd.code=='200'){
                $("#panel-status2").text("/ FoodIngredient");
                var food_url="http://medvisit.ir/screenMePic/"+jd.result.pic;
                var ingred_item=$('<div class="ingred-item-content"><img class=" ingred-img" id="output-2"  name="-2"><div class="ingred-text"><textarea class="ffood-h2 box-input servv-title message-box" rows="1" id="ingred-title" autocomplete="off" readonly="readonly"></textarea><hr id="foodIngredient-hr"><textarea class="ffood-p box-input servv-text message-box" rows="1" id="ingred-text"   autocomplete="off" readonly="readonly"></textarea></div></div>');
                ingred_item.find("#ingred-title").val(jd.result.name);
                ingred_item.find("#ingred-text").val(jd.result.preparationMethod);
                $("#ingred-item").append(ingred_item);
                $("#output-2").attr("src",food_url);
                $(".servv-text").css('min-height',$(".servv-text").get(0).scrollHeight+ 'px');
                $(".servv-title").css('min-height',$(".servv-title").get(0).scrollHeight+ 'px');
            }
            var textarea = document.querySelector('textarea');
            textarea.addEventListener('keydown', autosize);        
            function autosize(){
            var el = this;
            setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            },0);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(textStatus);
        } 
    });

    //get food categories
    $.ajax({
        type: 'POST',
        url: 'http://medvisit.ir/screenMe/api/public/getAllCategoriesOfFood',
        data : {email:"4@g.com",pass:"4",foodId:localStorage.getItem("foodId")},
        success: function(jd){
            allFoodCategory=jd;
            if(jd.code=='200'){
                
                //cant delete food category whene it is just one
                if(jd.result.length==1){
                    $("#category-delete").hide();
                }
                for (i = 0; i <jd.result.length; i++) { 
                    var ingred_categ=$('<div class="cat-item" id="cat-item'+jd.result[i].foodCategoriesId+'" name="'+jd.result[i].foodCategoriesId+'"><div id="categorys" name="'+jd.result[i].foodCategoriesId+'"><textarea rows="1" class="categ-textt message-box"  id="categ-textt'+jd.result[i].foodCategoriesId+'" name="'+jd.result[i].foodCategoriesId+'"readonly="readonly"></textarea><i class=" far fa-times-circle close-icon del-cat" name="'+jd.result[i].foodCategoriesId+'" ></i></div></div>');
                    ingred_categ.find(".categ-textt").val(jd.result[i].name);
                    $(".cat").append(ingred_categ);
                     $("#cat-item"+jd.result[i].foodCategoriesId).css('min-height', $("#categ-textt"+jd.result[i].foodCategoriesId).get(0).scrollHeight+ 'px');
                     $("#categ-textt"+jd.result[i].foodCategoriesId).css('min-height', $("#categ-textt"+jd.result[i].foodCategoriesId).get(0).scrollHeight+ 'px');

                    ingred_categ.find("#categorys").on("click", function() {
                        var category_selected=$(this).attr("name");
                        if(action_mod==-1){
                            localStorage.setItem("foodCategoriesId",category_selected);
                            for(j = 0; j <jd.result.length; j++){
                                if(jd.result[j].foodCategoriesId==category_selected){
                                    var dsd=jd.result[j].name;
                                    localStorage.setItem("categoryName",dsd );
                                    window.location="FoodsOfCategory.html";
                                }
                            }
                        }       
                    });
                    //delete food category
                    ingred_categ.find(".del-cat").on("click", function() {
                        categry_selected=$(this).attr("name");
                        var destinationPath;
                        if(jd.result.length==1)
                        {
                            if(!confirm("Are you sure deleting this food completely?"))
                            return;
                            destinationPath="FoodsOfCategory.html"   
                        }
                        else
                        {
                            if(!confirm("Are you sure deleting food category?"))
                            return;
                            destinationPath="foodIngredient.html"  
                        }
                        event.preventDefault();
                        const datas = new FormData();
                        datas.append('email',"4@g.com");
                        datas.append('pass',"4");
                        datas.append('foodId',localStorage.getItem("foodId"));                              
                        datas.append('foodCategoriesId',categry_selected);                              
                        $.ajax({
                            type: 'POST',
                            url: 'http://medvisit.ir/screenMe/api/public/deleteFoodForCategory',
                            data : datas,
                            enctype: 'multipart/form-data',
                            processData: false,    
                            contentType: false,
                            success: function(jdr){
                                if(jdr.code=='200'){
                                    window.location=destinationPath;
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown){
                                alert(textStatus);
                            }
                            
                        });
                    });
                } 
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(textStatus);
        } 
    });  

    //get food ingredients
    $.ajax({
        type: 'POST',
        url: 'http://medvisit.ir/screenMe/api/public/showIngredientOfFood',
        data : {email:"4@g.com",pass:"4",foodId:localStorage.getItem("foodId")},
        success: function(jd){
            allIngredientFood=jd;
            if(jd.code=='200'){

                //check visibility of delet icon
                if(jd.result.length==0){
                    $("#ingredient-delete").hide();
                }
                for (i = 0; i <jd.result.length; i++) { 
                    var ingred_ingre=$('<div class="line" id="line'+jd.result[i].id+'"></div><i class="fas fa-circle cic" id="cic-newitem"></i><div id="talkbubble"><textarea rows="1" id="ingred-text'+jd.result[i].id+'" class="ingred-textt message-box" readonly="readonly"></textarea><i class=" far fa-times-circle close-icon del-ingre" name="'+jd.result[i].id+'" ></i></div>');
                    ingred_ingre.find(".ingred-textt").val(jd.result[i].name);
                    $("#ingred-ingre").append(ingred_ingre);
                    ingred_ingre.find(".ingred-textt").css('min-height',  $("#ingred-text"+jd.result[i].id).get(0).scrollHeight+ 'px');
                    $("#line"+jd.result[i].id).css('min-height',(25+$("#ingred-text"+jd.result[i].id).get(0).scrollHeight)+ 'px');
                    //delet ingredient
                    ingred_ingre.find(".del-ingre").on("click", function() {
                        ingre_selected=$(this).attr("name");
                        if(!confirm("Are you sure deleting food ingredient?"))
                            return;
                            event.preventDefault();
                            const datas = new FormData();
                            datas.append('email',"4@g.com");
                            datas.append('pass',"4");
                            datas.append('ingredientId',ingre_selected);                              
                            $.ajax({
                                type: 'POST',
                                url: 'http://medvisit.ir/screenMe/api/public/deleteIngredientForFood',
                                data : datas,
                                enctype: 'multipart/form-data',
                                processData: false,    
                                contentType: false,
                                success: function(jdr){
                                    result=jdr;
                                    if(jdr.code=='200'){
                                        window.location="foodIngredient.html";
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown){
                                    alert(textStatus);
                                }
                                
                            });
                    });
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(textStatus);
        } 
    });
    
    // 0-> add_category   1->delete_category   2->add_ingredient  3->delete_ingredient  4->edit_ingredient
    var action_mod=-1 ;
    var category_adding=-1,category_deleting=-1 ,ingredient_adding=-1, ingredient_deleting=-1,ingredient_editing=-1 ;

    //add food catogry
    $("#category-add").click(function(){
        if(category_deleting!=1&&ingredient_adding!=1&&ingredient_deleting!=1&&ingredient_editing!=1){
            category_adding*=-1;
            if(category_adding==1){
                $( "#category-add" ).css({"color":"#20c5baf2"});
                action_mod=0;
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
                $("#panel-edit-status").text("/add category").css({"color":"#81e097"});
                $(".cat").append('<div id="category-list"><hr></div>');
                $.ajax({
                    type: 'POST',
                    url: 'http://medvisit.ir/screenMe/api/public/getAllFoodCategories',
                    data : {email:"4@g.com",pass:"4"},
                    success: function(jd){
                        recive_data=jd;
                        if(jd.code=='200'){
                            var ingred_categ;
                            var x=1;
                            for(i=0;i<jd.result.length;i++){
                                var flag=1;
                                for(j=0;j<allFoodCategory.result.length;j++)
                                {
                                    if(jd.result[i].id==allFoodCategory.result[j].foodCategoriesId)
                                    {
                                        flag=0;
                                        break;
                                    }
                                }
                                if(flag==1){ 
                                    var delay=x;
                                    //alert(delay);
                                    x+=0.5;
                                    ingred_categ=$('<div class="cat-item cat-newitem " id="cat-item'+jd.result[i].id+'" name="'+jd.result[j].id+'"><textarea rows="1" class="categ-textt message-box" id="category-list" name="'+jd.result[i].id+'" readonly="readonly" ><i class=" far fa-times-circle close-icon del-cat" name="'+jd.result[i].foodCategoriesId+'"></i></div>');
                                    ingred_categ.find(".categ-textt").val(jd.result[i].name);
                                    $("#category-list").append(ingred_categ);
                                    $("#cat-item"+jd.result[i].id).css('min-height',ingred_categ.find(".categ-textt").get(0).scrollHeight+ 'px');
                                    ingred_categ.find(".categ-textt").css('min-height',ingred_categ.find(".categ-textt").get(0).scrollHeight+ 'px');
                                   // $("#categ-textt"+jd.result[i].foodCategoriesId).css('min-height', $("#categ-textt"+jd.result[i].foodCategoriesId).get(0).scrollHeight+ 'px');
                                }
                                else
                                    continue;
                                ingred_categ.find("#category-list").on("click", function() {
                                    var category_selected=$(this).attr("name");
                                    event.preventDefault();
                                    const datas = new FormData();
                                    datas.append('email',"4@g.com");
                                    datas.append('pass',"4");
                                    datas.append('foodCategoriesId',""+category_selected);
                                    datas.append('foodId', localStorage.getItem("foodId"));
                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://medvisit.ir/screenMe/api/public/addCategoryForFood',
                                        data : datas,
                                        enctype: 'multipart/form-data',
                                        processData: false,    
                                        contentType: false, 
                                        success: function(jd){
                                            if(jd.code=='200'){
                                                $("#panel-edit-status").text("");
                                                window.location="foodIngredient.html";
                                            }
                                        },
                                        error: function(jqXHR, textStatus, errorThrown){
                                            alert(textStatus);
                                        }
                                    
                                    });
                                });
                            }
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert(textStatus);
                    } 
                });
            }
            else{
                $( "#category-list" ).remove();
                $( "#category-add" ).css({"color":"#515857"});
                action_mod=-1;
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
                $("#panel-edit-status").text("");
            }
        }
    });
    //delete food catogry
    $("#category-delete").click(function(){
        if(category_adding!=1&&ingredient_adding!=1&&ingredient_deleting!=1&&ingredient_editing!=1){        
            category_deleting*=-1;
            if(category_deleting==1){
                $( "#category-delete" ).css({"color":"#e2727d"});                
                action_mod=1;
                $(".del-cat").show();
                $("#panel-edit-status").text("/delete category").css({"color":"#e2727d"});
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
            }
            else{
                $( "#category-delete" ).css({"color":"#515857"});  
                action_mod=-1;
                $(".del-cat").hide();
                $("#panel-edit-status").text("");
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            }
        }
    });

    var newIngredNum=0;
    //add food ingredient
    $("#ingredient-add").click(function(){
        if(category_deleting!=1&&category_adding!=1&&ingredient_deleting!=1&&ingredient_editing!=1){
            ingredient_adding=1
            // if(ingredient_adding==1){
                $( "#ingredient-add" ).css({"color":"#20c5baf2"});
                action_mod=2;
                $('#save-txt').text('Add'); 
                $('#saved').text('Added'); 
                $("#save").show();
                $("#cancel").show();
                $("#panel-edit-status").text("/add category").css({"color":"#81e097"});
                var ingred_ingre=$('<div class="line new-ingredientt"></div><i class="fas fa-circle cic dd" id="cic-newitem"></i><div class="new-ingredient" id="talkbubble"><textarea rows="1"class="ingred-textt message-box" id="newIngredient'+newIngredNum+'"></textarea><i class=" far fa-times-circle close-icon del-ingre" name="-2" ></i></div>');
                $("#ingred-ingre").append(ingred_ingre);
                ingred_ingre.find(".message-box").on('input', function() {
                    var scroll_height = $(this).get(0).scrollHeight;

                    $(this).css('height', scroll_height + 'px');
                });
                $('html, body').animate({
                    scrollTop: $(".new-ingredient").offset().top
                }, 2000);
                newIngredNum++;
        }
    });
    //delete food ingredient
    $("#ingredient-delete").click(function(){
        if(category_adding!=1&&ingredient_adding!=1&&category_deleting!=1&&ingredient_editing!=1){        
            ingredient_deleting*=-1;
            if(ingredient_deleting==1){
                $( "#ingredient-delete" ).css({"color":"#20c5baf2"});           
                action_mod=3;
                $(".del-ingre").show();
                $("#panel-edit-status").text("/delete ingredient").css({"color":"#e2727d"});
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
            }
            else{
                $( "#ingredient-delete" ).css({"color":"#515857"});  
                action_mod=-1;
                $(".del-ingre").hide();
                $("#panel-edit-status").text("");
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            }
        }
    });
    //edit food ingredient
    $("#ingredient-edit").click(function(){
        if(category_adding!=1&&ingredient_adding!=1&&category_deleting!=1&&ingredient_deleting!=1){ 
            ingredient_editing*=-1;
            if(ingredient_editing==1){
                $( "#ingredient-edit" ).css({"color":"#ffc378"});                
                action_mod=4;
                $("#panel-edit-status").text("/delete ingredient").css({"color":"#ffc378"});
                $('#save-txt').text('Save'); 
                $('#saved').text('Saved'); 
                $("#save").show();
                $("#cancel").show();
                $("#panel-edit-status").text("/edit ingredient");
            }
            else{
                $( "#ingredient-edit" ).css({"color":"#515857"});  
                action_mod=-1;
                $(".del-ingre").hide();
                $("#panel-edit-status").text("");
                $("#save").hide();
                $("#cancel").hide();
            }
        }
    });
    //cancel 
    $("#cancel").click(function(){
        if(category_adding==1){
            category_adding*=-1;
            $( "#category-list" ).remove();
            $( "#category-add" ).css({"color":"#515857"});
            action_mod=-1;
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            $("#panel-edit-status").text("");
        }
        else if(category_deleting==1){
            category_deleting*=-1;
            $( "#category-delete" ).css({"color":"#515857"});  
            action_mod=-1;
            $(".del-cat").hide();
            $("#panel-edit-status").text("");
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
        }
        else if(ingredient_adding==1){
            ingredient_adding*=-1;
            $( ".new-ingredient" ).remove();
            $( ".new-ingredientt" ).remove();
            $( ".dd" ).remove();
            $( "#ingredient-add" ).css({"color":"#515857"});
            action_mod=-1;
            $("#save").hide();
            $("#cancel").hide();
            $("#panel-edit-status").text("");
        }
        else if(ingredient_deleting==1){
            ingredient_deleting*=-1;
            $( "#ingredient-delete" ).css({"color":"#515857"}); 
            action_mod=-1;
            $(".del-ingre").hide();
            $("#panel-edit-status").text("");
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
        }
        else if(ingredient_editing==1){
            ingredient_editing*=-1;
            $( "#ingredient-edit" ).css({"color":"#515857"});  
            action_mod=-1;
            $(".del-ingre").hide();
            $("#panel-edit-status").text("");
            $("#save").hide();
            $("#cancel").hide();
        }
    });

    $("#save").on("click", function() {
        //add
        if(action_mod==2){
            //check image
            for(i=0;i<newIngredNum;i++){
                var newIngredintText=$("#newIngredient"+i).val();
                if(newIngredintText==null||newIngredintText==''){
                    continue;
                }
                $("#save").hide();
                $("#cancel").hide();
                $("#saved").show();
                $("#saved").delay(600).fadeOut();
                $( "#ingredient-add" ).css({"color":"white"});
                event.preventDefault();
                const datas = new FormData();
                datas.append('email',"4@g.com");
                datas.append('pass',"4");
                datas.append('ingredient',newIngredintText);
                datas.append('foodId', localStorage.getItem("foodId"));
                $.ajax({
                    type: 'POST',
                    url: 'http://medvisit.ir/screenMe/api/public/addIngredientForFood',
                    data : datas,
                    enctype: 'multipart/form-data',
                    processData: false,    
                    contentType: false, 
                    success: function(jd){
                        if(jd.code=='200'){
                            $("#panel-edit-status").text("");
                            window.location="foodIngredient.html";
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert(textStatus);
                    }
                });
            }
        }
    });

    //action ico change color
    $("#category-add").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#category-add").mouseleave(function(){
        if(action_mod!=0){
            $(this).css({"color":"#515857"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
        }
    });
    $("#category-delete").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#category-delete").mouseleave(function(){
        if(action_mod!=1){
            $(this).css({"color":"#515857"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
        }
    });
    $("#ingredient-add").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#ingredient-add").mouseleave(function(){
        if(action_mod!=2){
            $(this).css({"color":"#515857"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
        }
    });
    $("#ingredient-delete").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#ingredient-delete").mouseleave(function(){
        if(action_mod!=3){
            $(this).css({"color":"#515857"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
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

});