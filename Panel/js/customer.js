 
var userEmail=localStorage.getItem("email");
var userPass=localStorage.getItem("pass");
if(userEmail==null||userPass==null||userEmail=="null"||userPass=="null"){
    window.location="login.html"
}
$(document).ready(function(){

    var userDetail,userFoods,userPlateItems,userBacteriaTests,userBloodTests;
    //getCustomerDetail
    $.ajax({
        type: 'POST',
        url: 'http://medvisit.ir/screenMe/api/public/getCustomerDetails',
        data : {email:"4@g.com",pass:"4",userId:localStorage.getItem("userId")},
        success: function(jd){
            userDetail=jd;
            userFoods=jd.result.foods;
            userPlates=jd.result.plateItems;
            userBacteriaTests=jd.result['Bacteria test'];
            userBloodTests=jd.result['Blood test'];
            userActivities=jd.result.activities;

            if(jd.code=='200'){
                
                //add user information 
                $("#firstName").html(localStorage.getItem('firstName'));
                $("#surName").html(localStorage.getItem('surName'));
                $("#email").html(localStorage.getItem('usersEmail'));
                $("#kitStatus").html(localStorage.getItem('kitStatus'));
                $("#address").html(localStorage.getItem('userAddress'));
                $("#postCode").html(localStorage.getItem('userPostCode'));       
                $("#birthDate").html(localStorage.getItem('userBirthDate').substring(0,11));   
                $("#age").html(getAge(localStorage.getItem('userBirthDate')));   

                let userWeight=localStorage.getItem('userWeight');
                let userHeight=localStorage.getItem('userHeight');
                $("#weight").html(userWeight);   
                $("#height").html(userHeight);   
                $("#BMI").html(getBMI(userWeight,userHeight));

                let userSex=localStorage.getItem("userSex"),sex;
                switch(userSex){
                    case "0": 
                        sex="male";
                        break;
                    case "1" :
                        sex="female";
                        break;
                    case "2" : 
                        sex="other";
                        break;
                    default:
                        sex="male"

                }
                $("#sex").html(sex);   


                //change user pic
                var avatarUrl="http://medvisit.ir/screenMePic/"+localStorage.getItem("userPic");
                $("#userAvatar").attr("src",avatarUrl)
                
                //add user food
                for(i=0;i<userFoods.length;i++){
                    var userFoodItem=$('<tr><td class="food-items" id="food-items'+userFoods[i].foodId+'" name="'+userFoods[i].foodId+'"></td></tr>');
                    userFoodItem.find(".food-items").html(userFoods[i].name);
                    $("#userFoodContain").append(userFoodItem);

                    //delet user food
                    userFoodItem.find(".food-items").on("click", function() {
                        if(category_deleting==1){
                            if(!confirm("Are you sure deleting food category?"))
                                return;  
                            var  categry_selected=$(this).attr("name") 
                            event.preventDefault();
                            const datas = new FormData();
                            datas.append('email',"4@g.com");
                            datas.append('pass',"4");
                            datas.append('customerId',localStorage.getItem("userId"));                              
                            datas.append('foodId',""+categry_selected);                              
                            $.ajax({
                                type: 'POST',
                                url: 'http://medvisit.ir/screenMe/api/public/deleteFoodForCustomer',
                                data : datas,
                                enctype: 'multipart/form-data',
                                processData: false, 
                                contentType: false,
                                success: function(jdr){
                                    if(jdr.code=='200'){
                                        window.location="customer.html"
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown){
                                    alert(textStatus);
                                }
                                
                            });                          
                        }                            
                    });
                }

                //add user plateItem
                for(i=0;i<userPlates.length;i++){
                    var userPlateItem=$('<tr><td class="plate-items" id="plate-items'+userPlates[i].plateItemId+'" name="'+userPlates[i].plateItemId+'"></td></tr>');
                    userPlateItem.find(".plate-items").html(userPlates[i].name);
                    $("#userPlateContain").append(userPlateItem);

                    //delet user food
                    userPlateItem.find(".plate-items").on("click", function() {
                        if(ingredient_deleting==1){
                            if(!confirm("Are you sure deleting plate item?"))
                                return;  
                            var  plate_selected=$(this).attr("name") 
                            event.preventDefault();
                            const datas = new FormData();
                            datas.append('email',"4@g.com");
                            datas.append('pass',"4");
                            datas.append('customerId',localStorage.getItem("userId"));                              
                            datas.append('plateItemId',""+plate_selected);                              
                            $.ajax({
                                type: 'POST',
                                url: 'http://medvisit.ir/screenMe/api/public/deletePlateItemForCustomer',
                                data : datas,
                                enctype: 'multipart/form-data',
                                processData: false,  
                                contentType: false,
                                success: function(jdr){
                                    if(jdr.code=='200'){
                                        window.location="customer.html"
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown){
                                    alert(textStatus);
                                }
                                
                            });                          
                        }                            
                    });
                }

                 //add user activity
                 for(i=0;i<userActivities.length;i++){
                    var userActivityItem=$('<tr><td class="activity-items" id="activity-items'+userActivities[i].activityId+'" name="'+userActivities[i].activityId+'"></td></tr>');
                    userActivityItem.find(".activity-items").html(userActivities[i].activityName);
                    $("#userActivityContain").append(userActivityItem);

                    //delet user activity
                    userActivityItem.find(".activity-items").on("click", function() {
                        if(activity_deleting==1){
                            if(!confirm("Are you sure deleting this activity?"))
                                return;  
                            var  activity_selected=$(this).attr("name") 
                            event.preventDefault();
                            const datas = new FormData();
                            datas.append('email',"4@g.com");
                            datas.append('pass',"4");
                            datas.append('customerId',localStorage.getItem("userId"));                              
                            datas.append('activityId',""+activity_selected);    
                            $.ajax({
                                type: 'POST',
                                url: 'http://medvisit.ir/screenMe/api/public/deleteActivityOfCustomer',
                                data : datas,
                                enctype: 'multipart/form-data',
                                processData: false,  
                                contentType: false,
                                success: function(jdr){
                                    if(jdr.code=='200'){
                                        window.location="customer.html"
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown){
                                    alert(textStatus);
                                }
                                
                            });                          
                        }                            
                    });
                }

                //add user test
                // bacteria test 
                for(i=0;i<userBacteriaTests.length;i++){
                    var userTestItem=$('<tr class="testTableRow"><td class="testName test-items" name="'+userBacteriaTests[i].kitCode+'" title="'+userBacteriaTests[i].kitStatus+'"></td><td class="kitCode test-items" name="'+userBacteriaTests[i].kitStatus+'"></td></tr>');
                    userTestItem.find(".testName").html(userBacteriaTests[i].kitCode);
                    userTestItem.find(".kitCode").html(userBacteriaTests[i].kitStatus);
                    $("#userBacteriaTestContain").append(userTestItem);

                    //show test result
                    $(".testTableRow").mouseenter(function(){
                        $(this).css({"cursor":"pointer","transform":"scale(1.01,1)"});  
                    });
                    $(".testTableRow").mouseleave(function(){
                        $(this).css({"cursor":"pointer","transform":"scale(1,1)"});  
                    });
                    userTestItem.find(".test-items").on("click", function() { 
                        var  test_selected=$(this).attr("name") ;
                        var  test_status=$(this).attr("title") ;
                        localStorage.setItem("testCode",""+test_selected)
                        localStorage.setItem("testStatus",""+test_status)
                        localStorage.setItem("testType",""+1)
                        if(test_status!=4)
                            window.location="TestResult.html";
                        
                        event.preventDefault();
                            const datas = new FormData();
                            datas.append('email',"4@g.com");
                            datas.append('pass',"4");
                            datas.append('testCode',""+test_selected);        
                            $.ajax({
                                type: 'POST',
                                url: 'http://medvisit.ir/screenMe/api/public/getTestResults',
                                data : datas,
                                enctype: 'multipart/form-data',
                                processData: false,  
                                contentType: false,
                                success: function(respons){
                                    if(respons.code=='200'){
                                        
                                        $("#testResultTable").empty()
                                        $(".testCat1").html("&nbsp&nbsp   Metabolic");
                    
                                        var testResultArr=respons.result.valuedFactors;
                                
                                        for(i=0;i<testResultArr.length;i++){
                                            var testItem=$('<tr><td class="testName" ></td><td class="testValue" ></td><td class="testCategory"></td></tr>');
                                            testItem.find(".testName").html(testResultArr[i].factorName);
                                            testItem.find(".testValue").html(testResultArr[i].value);
                                            testItem.find(".testCategory").html(testResultArr[i].categoryName);
                                            $("#testResultTable").append(testItem);
                                        }
                                    
                                        $( "#modalClick" ).trigger( "click" );

                                    }

                                },
                                error: function(jqXHR, textStatus, errorThrown){
                                    alert(textStatus);
                                }
                                
                            });            
                    });
                    
                }
                $(".editModalbtn").click(function(){
                    window.location="TestResult.html";
                });

                //blod test
                for(i=0;i<userBloodTests.length;i++){
                    var userTestItem=$('<tr class="testTableRow"><td class="testName test-items2" name="'+userBloodTests[i].kitCode+'" title="'+userBloodTests[i].kitStatus+'" ></td><td class="kitCode test-items2" name="'+userBloodTests[i].kitCode+'"></td></tr>');
                    userTestItem.find(".testName").html(userBloodTests[i].kitCode);
                    userTestItem.find(".kitCode").html(userBloodTests[i].kitStatus); 
                    $("#userBloodTestContain").append(userTestItem);

                    //show test result
                    $(".testTableRow").mouseenter(function(){
                        $(this).css({"cursor":"pointer","transform":"scale(1.01,1)"});  
                    });
                    $(".testTableRow").mouseleave(function(){
                        $(this).css({"cursor":"pointer","transform":"scale(1,1)"});  
                    });
                    userTestItem.find(".test-items2").on("click", function() { 
                        var  test_selected=$(this).attr("name") ;
                        var  test_status=$(this).attr("title") ;
                        localStorage.setItem("testCode",""+test_selected)
                        localStorage.setItem("testStatus",""+test_status)
                        localStorage.setItem("testType",""+2)
                        if(test_status!=4)
                            window.location="TestResult.html";
                        event.preventDefault();
                            const datas = new FormData();
                            datas.append('email',"4@g.com");
                            datas.append('pass',"4");
                            datas.append('testCode',""+test_selected);        
                            $.ajax({
                                type: 'POST',
                                url: 'http://medvisit.ir/screenMe/api/public/getTestResults',
                                data : datas,
                                enctype: 'multipart/form-data',
                                processData: false,  
                                contentType: false,
                                success: function(respons){
                                    if(respons.code=='200'){
                                        $("#testResultTable").empty();
                                        $(".testCat1").html("&nbsp&nbsp   Metabolic");
                    
                                        var testResultArr=respons.result.valuedFactors;
                                       
                                        for(i=0;i<testResultArr.length;i++){
                                            var testItem=$('<tr><td class="testName" ></td><td class="testValue" ></td><td class="testCategory"></td></tr>');
                                            testItem.find(".testName").html(testResultArr[i].factorName);
                                            testItem.find(".testValue").html(testResultArr[i].value);
                                            testItem.find(".testCategory").html(testResultArr[i].categoryName);
                                            $("#testResultTable").append(testItem);
                                        }
                                    
                                        $( "#modalClick" ).trigger( "click" );
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
    
    // 0-> add_category   1->delete_category   2->add_ingredient  3->delete_ingredient  4->edit_tests
    var action_mod=-1 ;
    var category_adding=-1,category_deleting=-1 ,ingredient_adding=-1, ingredient_deleting=-1,ingredient_editing=-1 ,activity_adding=-1,activity_deleting=-1;

    //add food catogry
    $("#category-add").click(function(){
        if(category_deleting!=1&&ingredient_adding!=1&&ingredient_deleting!=1&&ingredient_editing!=1&&activity_adding!=1&&activity_deleting!=1){
            category_adding*=-1;
            if(category_adding==1){
                $( "#category-add" ).css({"color":"#20c5baf2"});
                action_mod=0;
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
                $("#panel-edit-status").text("/add food").css({"color":"#81e097"});
                $(".cat").append('<div id="allfoodblock"><hr><input class="form-control" id="foodSearch" type="text" placeholder="Search.." autocomplete="off"><table class="table user-food"><tbody id="newFoodtable"></tbody></table></div>');
                $.ajax({
                    type: 'POST',
                    url: 'http://medvisit.ir/screenMe/api/public/getAllFoods',
                    data : {email:"4@g.com",pass:"4",offset:"0",limit:"100"},
                    success: function(jd){
                        recive_data=jd;
                        if(jd.code=='200'){
                            var allFoodsItem;
                            var x=1;
                            for(i=0;i<jd.result.length;i++){
                                var flag=1;
                                for(j=0;j<userFoods.length;j++)
                                {
                                    if(jd.result[i].id==userFoods[j].foodId)
                                    {
                                        flag=0;
                                        break;
                                    }
                                }
                                if(flag==1){ 
                                    var delay=x;
                                    x+=0.5;
                                    allFoodsItem=$('<tr><td class="food-item" id="food-item'+jd.result[i].id+'" name="'+jd.result[i].id+'"></td></tr>');
                                    allFoodsItem.find(".food-item").html(jd.result[i].name);
                                    $("#newFoodtable").append(allFoodsItem);
                                }
                                else
                                    continue;

                                $("#foodSearch").on("keyup", function() {
                                    var value = $(this).val().toLowerCase();
                                    $("#newFoodtable tr").filter(function() {
                                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                                    });
                                });
                                allFoodsItem.find(".food-item").on("click", function() {
                                    var food_selected=$(this).attr("name");
                                    event.preventDefault();
                                    const datas = new FormData();
                                    datas.append('email',"4@g.com");
                                    datas.append('pass',"4");
                                    datas.append('foodId',""+food_selected);
                                    datas.append('customerId', localStorage.getItem("userId"));
                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://medvisit.ir/screenMe/api/public/addFoodForCustomer',
                                        data : datas,
                                        enctype: 'multipart/form-data',
                                        processData: false,  
                                        contentType: false, 
                                        success: function(jd){
                                            if(jd.code=='200'){
                                                $("#panel-edit-status").text("");
                                                window.location="customer.html";
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
                $( "#allfoodblock" ).remove();
                $( "#category-add" ).css({"color":"black"});
                action_mod=-1;
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
                $("#panel-edit-status").text("");
            }
        }
    });
    
    //delete food catogry
    $("#category-delete").click(function(){
        if(category_adding!=1&&ingredient_adding!=1&&ingredient_deleting!=1&&ingredient_editing!=1&&activity_adding!=1&&activity_deleting!=1){        
            category_deleting*=-1;
            if(category_deleting==1){
                $( "#category-delete" ).css({"color":"#20c5baf2"});                
                action_mod=1;
                $("#panel-edit-status").text("/delete food").css({"color":"#e2727d "});
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
                $(".food-items").mouseenter(function(){
                    $(this).css({"cursor":"pointer","transform":"scale(1.01,1)"});  
                });
                $(".food-items").mouseleave(function(){
                    $(this).css({"cursor":"default","transform":"scale(1,1)"});
                });
            }
            else{
                $( "#category-delete" ).css({"color":"black"});  
                action_mod=-1;
                $("#panel-edit-status").text("");
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
                $(".food-items").mouseenter(function(){
                    $(this).css({"cursor":"default","transform":"scale(1,1)"});
                });
            }
        }
    });
    
    //add plate item
    $("#plate-add").click(function(){
        if(category_deleting!=1&&category_adding!=1&&ingredient_deleting!=1&&ingredient_editing!=1&&activity_adding!=1&&activity_deleting!=1){
            ingredient_adding*=-1;
            if(ingredient_adding==1){
                $( "#plate-add" ).css({"color":"#20c5baf2"});
                action_mod=2;
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
                $("#panel-edit-status").text("/add plate item").css({"color":"#81e097 "});
                $(".plateIt").append('<div id="allplateblock"><hr><input class="form-control plateSearch" id="plateSearch" type="text" placeholder="Search.." autocomplete="off"><table class="table user-plate"><tbody id="newPlatetable"></tbody></table></div>');
                $.ajax({
                    type: 'POST',
                    url: 'http://medvisit.ir/screenMe/api/public/getAllPlateItems',
                    data : {email:"4@g.com",pass:"4",offset:"0",limit:"100"},
                    success: function(jd){
                        recive_data=jd;
                        if(jd.code=='200'){
                            var allPlateItem;
                            var x=1;
                            for(i=0;i<jd.result.length;i++){
                                var flag=1;
                                for(j=0;j<userPlates.length;j++)
                                {
                                    if(jd.result[i].id==userPlates[j].plateItemId)
                                    {
                                        flag=0;
                                        break;
                                    }
                                }
                                if(flag==1){ 
                                    var delay=x;
                                    x+=0.5;
                                    allPlateItem=$('<tr><td class="plate-item" id="plate-item'+jd.result[i].id+'" name="'+jd.result[i].id+'"></td></tr>');
                                    allPlateItem.find(".plate-item").html(jd.result[i].name);
                                    $("#newPlatetable").append(allPlateItem);
                                }
                                else
                                    continue;

                                $("#plateSearch").on("keyup", function() {
                                    var value = $(this).val().toLowerCase();
                                    $("#newPlatetable tr").filter(function() {
                                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                                    });
                                });
                                allPlateItem.find(".plate-item").on("click", function() {
                                    var plate_selected=$(this).attr("name");
                                    event.preventDefault();
                                    const datas = new FormData();
                                    datas.append('email',"4@g.com");
                                    datas.append('pass',"4");
                                    datas.append('plateItemId',""+plate_selected);
                                    datas.append('customerId', localStorage.getItem("userId"));
                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://medvisit.ir/screenMe/api/public/addPlateItemForCustomer',
                                        data : datas,
                                        enctype: 'multipart/form-data',
                                        processData: false,  
                                        contentType: false, 
                                        success: function(jd){
                                            if(jd.code=='200'){
                                                $("#panel-edit-status").text("");
                                                window.location="customer.html";
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
                $( "#allplateblock" ).remove();
                $( "#plate-add" ).css({"color":"black"});
                action_mod=-1;
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
                $("#panel-edit-status").text("");
            }
        }
        
    });

    //delete plate item
    $("#plate-delete").click(function(){
        if(category_adding!=1&&ingredient_adding!=1&&category_deleting!=1&&ingredient_editing!=1&&activity_adding!=1&&activity_deleting!=1){        
            ingredient_deleting*=-1;
            if(ingredient_deleting==1){
                $( "#plate-delete" ).css({"color":"#20c5baf2"});                
                action_mod=3;
                $("#panel-edit-status").text("/delete plate item").css({"color":"#e2727d"});
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
                $(".plate-items").mouseenter(function(){
                    $(this).css({"cursor":"pointer","transform":"scale(1.01,1)"});
                });
                $(".plate-items").mouseleave(function(){
                    $(this).css({"cursor":"default","transform":"scale(1,1)"});
                });
            }
            else{
                $( "#plate-delete" ).css({"color":"black"});  
                action_mod=-1;
                $("#panel-edit-status").text("");
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
                $(".plate-items").mouseenter(function(){
                    $(this).css({"cursor":"default","transform":"scale(1,1)"});
                });
            }
        }
    });

    //add activity
    $("#activity-add").click(function(){
        if(category_deleting!=1&&ingredient_adding!=1&&ingredient_deleting!=1&&ingredient_editing!=1&&category_adding!=1&&activity_deleting!=1){
            activity_adding*=-1;
            if(activity_adding==1){
                $( "#activity-add" ).css({"color":"#20c5baf2"});
                action_mod=4;
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
                $("#panel-edit-status").text("/add activity").css({"color":"#81e097"});
                $(".activ").append('<div id="allactivityblock"><hr><input class="form-control" id="activitySearch" type="text" placeholder="Search.." autocomplete="off"><table class="table user-food"><tbody id="newActivitytable"></tbody></table></div>');
                $.ajax({
                    type: 'POST',
                    url: 'http://medvisit.ir/screenMe/api/public/getAllActivities',
                    data : {email:"4@g.com",pass:"4",offset:"0",limit:"100"},
                    success: function(jd){
                        recive_data=jd;
                        if(jd.code=='200'){
                            var allActivitiesItem;
                            var x=1;
                            for(i=0;i<jd.result.length;i++){
                                var flag=1;
                                for(j=0;j<userActivities.length;j++)
                                {
                                    if(jd.result[i].id==userActivities[j].activityId)
                                    {
                                        flag=0;
                                        break;
                                    }
                                }
                                if(flag==1){ 
                                    var delay=x;
                                    //alert(delay);
                                    x+=0.5;
                                    allActivitiesItem=$('<tr><td class="activity-item" id="activity-item'+jd.result[i].id+'" name="'+jd.result[i].id+'"></td></tr>');
                                    allActivitiesItem.find(".activity-item").html(jd.result[i].name);
                                    $("#newActivitytable").append(allActivitiesItem);
                                }
                                else
                                    continue;

                                $("#activitySearch").on("keyup", function() {
                                    var value = $(this).val().toLowerCase();
                                    $("#newActivitytable tr").filter(function() {
                                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                                    });
                                });
                                allActivitiesItem.find(".activity-item").on("click", function() {
                                    var activity_selected=$(this).attr("name");
                                    event.preventDefault();
                                    const datas = new FormData();
                                    datas.append('email',"4@g.com");
                                    datas.append('pass',"4");
                                    datas.append('activityId',""+activity_selected);
                                    datas.append('customerId', localStorage.getItem("userId"));
                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://medvisit.ir/screenMe/api/public/insertActivityOfCustomer',
                                        data : datas,
                                        enctype: 'multipart/form-data',
                                        processData: false,  
                                        contentType: false, 
                                        success: function(jd){
                                            if(jd.code=='200'){
                                                $("#panel-edit-status").text("");
                                                window.location="customer.html";
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
                $( "#allactivityblock" ).remove();
                $( "#activity-add" ).css({"color":"black"});
                action_mod=-1;
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
                $("#panel-edit-status").text("");
            }
        }
    });
    
    //delete activity
    $("#activity-delete").click(function(){
        if(category_adding!=1&&ingredient_adding!=1&&ingredient_deleting!=1&&ingredient_editing!=1&&activity_adding!=1&&category_deleting!=1){        
            activity_deleting*=-1;
            if(activity_deleting==1){
                $( "#activity-delete" ).css({"color":"#20c5baf2"});                
                action_mod=5;
                $("#panel-edit-status").text("/delete activity").css({"color":"#e2727d"});
                $("#cancel").removeClass("cancel-buttom").addClass("saved-buttom").show();
                $(".activity-items").mouseenter(function(){
                    $(this).css({"cursor":"pointer","transform":"scale(1.01,1)"});
                });
                $(".activity-items").mouseleave(function(){
                    $(this).css({"cursor":"default","transform":"scale(1,1)"});
                });
            }
            else{
                $( "#activity-delete" ).css({"color":"black"});  
                action_mod=-1;
                $("#panel-edit-status").text("");
                $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
                $(".activity-items").mouseenter(function(){
                    $(this).css({"cursor":"default","transform":"scale(1,1)"});
                });
            }
        }
    });
    
    //cancel 
    $("#cancel").click(function(){
        if(category_adding==1){
            category_adding*=-1;
            $( "#allfoodblock" ).remove();
            $( "#category-add" ).css({"color":"black"});
            action_mod=-1;
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            $("#panel-edit-status").text("");
        }
        else if(category_deleting==1){
            category_deleting*=-1;
            $( "#category-delete" ).css({"color":"black"});  
            action_mod=-1;
            $("#panel-edit-status").text("");
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            $(".food-items").mouseenter(function(){
                $(this).css({"cursor":"default","transform":"scale(1,1)"});
            });
        }
        else if(ingredient_adding==1){
            ingredient_adding*=-1;
            $( "#allplateblock" ).remove();
            $( "#plate-add" ).css({"color":"black"});
            action_mod=-1;
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            $("#panel-edit-status").text("");
        }
        else if(ingredient_deleting==1){
            ingredient_deleting*=-1;
            $( "#plate-delete" ).css({"color":"black"});  
            action_mod=-1;
            $("#panel-edit-status").text("");
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            $(".plate-items").mouseenter(function(){
                $(this).css({"cursor":"default","transform":"scale(1,1)"});
            });
        }
        else if(activity_adding==1){
            activity_adding*=-1;
            $( "#allactivityblock" ).remove();
            $( "#activity-add" ).css({"color":"black"});
            action_mod=-1;
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            $("#panel-edit-status").text("");
        }
        else if(activity_deleting==1){
            activity_deleting*=-1;
            $( "#activity-delete" ).css({"color":"black"});  
            action_mod=-1;
            $("#panel-edit-status").text("");
            $("#cancel").removeClass("saved-buttom").addClass("cancel-buttom").hide();
            $(".activity-items").mouseenter(function(){
                $(this).css({"cursor":"default","transform":"scale(1,1)"});
            });
        }
    });

    //action ico change color
    $("#category-add").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#category-add").mouseleave(function(){
        if(action_mod!=0){
            $(this).css({"color":"black"});
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
            $(this).css({"color":"black"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
        }
    });
    $("#plate-add").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#plate-add").mouseleave(function(){
        if(action_mod!=2){
            $(this).css({"color":"black"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
        }
    });
    $("#plate-delete").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#plate-delete").mouseleave(function(){
        if(action_mod!=3){
            $(this).css({"color":"black"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
        }
    });
    $("#test-edit").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#test-edit").mouseleave(function(){
        if(action_mod!=4){
            $(this).css({"color":"black"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
        }
    });
    $("#activity-add").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#activity-add").mouseleave(function(){
        if(action_mod!=4){
            $(this).css({"color":"black"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
        }
    });
    $("#activity-delete").mouseenter(function(){
        $(this).css({"color":"#20c5baf2"});
        
    });
    $("#activity-delete").mouseleave(function(){
        if(action_mod!=5){
            $(this).css({"color":"black"});
        }
        else{
            $(this).css({"color":"#20c5baf2"});
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


    //edit user
    let userEditMode="default",uploadedFile=false;
    document.getElementById('userAvatar').addEventListener('click', () => {
        if(userEditMode=="edit"){
            document.getElementById('userAvatarInp').click()                
        }
    })
    document.getElementById('userAvatarInp').onchange = imageUrlChange;

    function imageUrlChange(){
        uploadedFile=event.target.files[0];
        $("#userAvatar").attr('src', URL.createObjectURL(uploadedFile));
    }
    
    $("#editSchoolIcon").click(function(){
        if(userEditMode=="default"){
            userEditMode="edit";

            $("#firstNameInp").val($("#firstName").html());
            $("#surNameInp").val($("#surName").html());
            $("#emailInp").val($("#email").html());
            $("#addressInp").val($("#address").html());
            $("#postCodeInp").val($("#postCode").html());
            $("#birthDateInp").val($("#birthDate").html());
            $("#weightInp").val($("#weight").html());
            $("#heightInp").val($("#height").html());
            $("#sex"+localStorage.getItem("userSex")).attr('selected', 'selected');
            enableEditSchool();
        }
    });
    $("#saveSchoolIcon").click(function(){
        if(userEditMode=="edit"){
            var avatarUrl="http://medvisit.ir/screenMePic/"+localStorage.getItem("userPic");
            if($("#userAvatar").attr('src')!=avatarUrl)
                avatarUrl="-1";
            else
                avatarUrl=localStorage.getItem("userPic");
            const datas = new FormData();
            datas.append('email',"4@g.com");
            datas.append('pass',"4");
            datas.append('customerId',localStorage.getItem('userId'));
            datas.append('firstName',$("#firstNameInp").val());
            datas.append('surName',$("#surNameInp").val());
            // datas.append('costomerEmail',$("#emailInp").val());
            datas.append('address',$("#addressInp").val());
            datas.append('postCode',$("#postCodeInp").val());
            datas.append('weight',$("#weightInp").val());
            datas.append('height',$("#heightInp").val());
            datas.append('birthDate',$("#birthDateInp").val());
            datas.append('pic',avatarUrl);
            datas.append('uploaded_file',uploadedFile);

            let userSex=$('#sexInp').find(":selected").text();;
            switch(userSex){
                case "male": 
                    sex=0;
                    break;
                case "female" :
                    sex=1;
                    break;
                case "other" : 
                    sex=2;
                    break;
                default:
                    sex=0
            }
            datas.append('sex',sex);
            editing(datas);

        }
    });
    $("#cancelSchoolIcon").click(function(){
        if(userEditMode=="edit"){
            userEditMode="default"
            $("#imageUrl").attr('src',"http://medvisit.ir/screenMePic/"+localStorage.getItem("userPic"));
            disableEditSchool();
        }
    });
    function enableEditSchool(){

        $("#editSchoolIcon").hide();
        $("#saveSchoolIcon").show();
        $("#cancelSchoolIcon").show();

        $("#firstName").hide();
        $("#firstNameInp").show();

        $("#surName").hide();
        $("#surNameInp").show();

        // $("#email").hide();
        // $("#emailInp").show();

        $("#address").hide();
        $("#addressInp").show();

        $("#postCode").hide();
        $("#postCodeInp").show();

        $("#birthDate").hide();
        $("#birthDateInp").show();

        $("#sex").hide();
        $("#sexInp").show();

        $("#weight").hide();
        $("#weightInp").show();

        $("#height").hide();
        $("#heightInp").show();
    }
    function disableEditSchool(){

        $("#editSchoolIcon").show();
        $("#saveSchoolIcon").hide();
        $("#cancelSchoolIcon").hide();


        $("#firstName").show();
        $("#firstNameInp").hide();

        $("#surName").show();
        $("#surNameInp").hide();

        // $("#email").show();
        // $("#emailInp").hide();

        $("#address").show();
        $("#addressInp").hide();

        $("#postCode").show();
        $("#postCodeInp").hide();

        $("#birthDate").show();
        $("#birthDateInp").hide();

        $("#sex").show();
        $("#sexInp").hide();

        $("#weight").show();
        $("#weightInp").hide();

        $("#height").show();
        $("#heightInp").hide();

    }
    function editing(datas){
        event.preventDefault();
        setTimeout(function() 
        {  
            $.ajax({
                type: 'POST',
                url: 'http://medvisit.ir/screenMe/api/public/editCustomerInfo',
                data : datas,
                enctype: 'multipart/form-data',
                processData: false,  
                contentType: false,
                success: function(jd){
                    result=jd;
                    if(jd.code=='200'){
                        localStorage.setItem("firstName",jd.result.firstName);
                        localStorage.setItem("surName",jd.result.surName);
                        localStorage.setItem("usersEmail",jd.result.email);
                        localStorage.setItem("userPic",jd.result.pic);
                        localStorage.setItem("userAddress",jd.result.address);
                        localStorage.setItem("userPostCode",jd.result.postCode);
                        localStorage.setItem("userWeight",jd.result.weight);
                        localStorage.setItem("userHeight",jd.result.height);
                        localStorage.setItem("userSex",jd.result.sex);
                        localStorage.setItem("userBirthDate",jd.result.birthDate);
                        window.location="customer.html";
                        
                    }
                        
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(textStatus);
                }
            });
        }, 2500);
    }
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    function getBMI(weight,height){
        return (Number(weight)/(Number(height)*Number(height))*703).toFixed(2)
    }
});