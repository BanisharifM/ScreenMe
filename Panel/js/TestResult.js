
var userEmail=localStorage.getItem("email");
var userPass=localStorage.getItem("pass");
if(userEmail==null||userPass==null||userEmail=="null"||userPass=="null"){
    window.location="login.html"
}
$(document).ready(function(){
    
    var testCode=localStorage.getItem("testCode");
    var testStatus=localStorage.getItem("testCode")
    var testType=localStorage.getItem("testType")

    //Doctors
    var drIdNew=""
    const data = new FormData();
    data.append('email',"4@g.com");
    data.append('pass',"4");    
    $.ajax({
        type: 'POST',
        url: 'http://medvisit.ir/screenMe/api/public/getDoctors',
        data : data,
        enctype: 'multipart/form-data',
        processData: false,  
        contentType: false,
        success: function(respons){
            if(respons.code=='200'){
                for(i=0;i<respons.result.length;i++){
                    var dr=respons.result[i]
                    var drId=dr.id
                    drIdNew=drId
                    var drName=dr.prefix+dr.firstName+" "+dr.lastName
                    var doctorItem=$('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="drListItm" name="'+drId+'" id="drId'+drId+'">'+drName+'</a></li>');
                    doctorItem.find(".drListItm").val(drName);
                    $("#drMenu").append(doctorItem);

                    doctorItem.find(".drListItm").click(function(){
                        drIdNew=$(this).attr("name");
                        var drName=$(this).val();
                        $("#drName").html(drName);
                        $("#drMenuCaret").css("transform","rotate(270deg)");
                        $("#drMenu").hide();
                    });
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(textStatus);
        }     
    });

    var rawRespons;
    const datas0 = new FormData();
    datas0.append('email',"4@g.com");
    datas0.append('pass',"4");
    datas0.append('testId',""+testType);        
    $.ajax({
        type: 'POST',
        url: 'http://medvisit.ir/screenMe/api/public/getAllFactorsOfTest',
        data : datas0,
        enctype: 'multipart/form-data',
        processData: false,  
        contentType: false,
        success: function(respons){
            if(respons.code=='200'){
                rawRespons=respons.result;

                const datas = new FormData();
                datas.append('email',"4@g.com");
                datas.append('pass',"4");
                datas.append('testCode',""+testCode);        
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
                            // $(".testCat1").html("&nbsp&nbsp   Metabolic");
                            if(respons.result.comment.length!=0){
                                var drComment=respons.result.comment[0]
                                drIdNew=drComment.docId;
                                $("#drComentp").html(drComment.comment)
                                $("#drName").html(drComment.expertPrefix +drComment.doctorsFirstName+" "+drComment.doctorsLastName)
                            }
                            var testResultScores=respons.result.scores;
                            for(i=0;i<testResultScores.length;i++){
                                var scoreItem=$('<p class="drScoreP">'+testResultScores[i].scoreName+'&nbsp&nbsp :'+testResultScores[i].value+'</p>')
                                $("#drScore").append(scoreItem);
                            }

                            var testResultArr=respons.result.valuedFactors;
                            // if(testResultArr.length==0)
                            //     window.location="TestResult.html";
                            for(i=0;i<rawRespons.length;i++){
                                var factorVal=""
                                var testFactorId=rawRespons[i].id;
                                for(j=0;j<testResultArr.length;j++){
                                    if(rawRespons[i].name==testResultArr[j].factorName){
                                        factorVal=testResultArr[j].value;
                                        testFactorId=testResultArr[j].factorId
                                        break;
                                    }
                                }
                                var testItem=$('<tr><td class="testName testNames" ></td><td  ><textarea class="testValue" readonly="false" name="'+testFactorId+'" id="testValue'+i+'" ></textarea></td><td class="testCategory"></td></tr>');
                                testItem.find(".testName").html(rawRespons[i].name);
                                testItem.find(".testValue").html(factorVal);
                                testItem.find(".testCategory").html(rawRespons[i].categoryName);
                                $("#testResultTable").append(testItem);

                                testItem.find(".testValue").on("click", function() {
                                    if(editing==1){
                                        $(this).prop("readonly", false);
                                    }
                                    else if(editing==-1){
                                        $(this).prop("readonly", true);   
                                    }
                                });
                            }
                        
                            $( "#modalClick" ).trigger( "click" );
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert(textStatus);
                    }
                }); 
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

    //dr menu 
    $("#menu1").click(function(){
        if(editing==1){
            $("#drMenuCaret").css("transform","rotate(360deg)")
            $("#drMenu").show();
        }
    });

    $("#drComentp").on("click", function() {
        if(editing==1){
            $(this).prop("readonly", false);
        }
        else if(editing==-1){
            $(this).prop("readonly", true);   
        }
    });

    //edit menu 
    $(".edit").mouseenter(function(){
        $(".edit").css({"-webkit-box-shadow": "0px 0px 10px 10px rgba(133,171,38,1)",
        "-moz-box-shadow": "0px 0px 10px 0px rgba(133,171,38,1)",
        "box-shadow": "0px 0px 10px 0px rgba(133,171,38,1)"}).delay(1000);
    });

    $(".edit").mouseleave(function(){
        $(".edit").css({"-webkit-box-shadow": "none",
        "-moz-box-shadow": "none",
        "box-shadow": "none"});
    });


    var editing=-1
    //edit menu click
    $(".iico0").click(function(){
        editing*=-1;
        action_mod=0;
        if(editing==1)
        {
            $( "#firstiico" ).removeClass( "fa-edit" ).addClass( "fa-pen" ).css({"color":"#ff3333"});
            $('#save-text').text('Save'); 
            $('#saved').text('Saved'); 
            $("#save").show();
            $("#cancel").show();
            $("#panel-edit-status").text("/edit").css({"color":"rgb(255, 195, 120)"});
            $(".serv-title").addClass("textarea-editable");
            $("#drMenuCaret").css("visibility","visible");
            // $('#drComentp').prob('readonly',false);
            $("#drComentp").addClass("textarea-editable");
            $(".testValue").addClass("textarea-editable");
            // $("#menu1").atrr("data-toggle","dropdown");
            // $("#drMenu").show();
        }
        else{
            $( "#firstiico" ).removeClass( "fa-pen" ).addClass( "fa-edit" ).css({"color":"white"});
            $("#save").hide();
            $("#cancel").hide();
            $("#panel-edit-status").text("");
            localStorage.setItem("loader",0);
            $("#drComentp").removeClass("textarea-editable");
            window.location="TestResult.html";
            $("#drMenuCaret").css("visibility","visible");
        }
    });
    //cancel editing
    $("#cancel").click(function(){
        if(editing==1){
            editing*=-1;
            $( "#firstiico" ).removeClass( "fa-pen" ).addClass( "fa-edit" ).css({"color":"white"});
            $("#save").hide();
            $("#cancel").hide();
            $("#panel-edit-status").text("");
            localStorage.setItem("loader",0);
            $("#drComentp").remove("textarea-editable");
            window.location="TestResult.html";
        }
    });

    $("#save").on("click", function() {
        //edit
        if(action_mod==0){
            $("#save").hide();
            $("#cancel").hide();
            $(".edit").hide();
            $("#circle-loader").show();
            var edit_flag=0;

            var commentObj=[];
            item = {}
            item ["doctorId"] = drIdNew;
            item ["newValue"] = $("#drComentp").val()
            commentObj.push(item)
            var allObj=[]
            for(i=0;i<rawRespons.length;i++){
                item={}
                var testVal=$("#testValue"+i).val();
                if(testVal=="")
                    continue;
                item ["testFactorId"] =$("#testValue"+i).attr("name");
                item ["newValue"] =testVal
                allObj.push(item);
            }
            testResData={}
            testResData["all"]=allObj;
            testResData["comment"]=commentObj;

        event.preventDefault();
        const datas = new FormData();
        datas.append('email',"4@g.com");
        datas.append('pass',"4");
        datas.append('testCode',testCode);
        datas.append('array',JSON.stringify(testResData));
        setTimeout(function() 
        {  
            $.ajax({
                type: 'POST',
                url: 'http://medvisit.ir/screenMe/api/public/InsertTestResults',
                data : datas,
                enctype: 'multipart/form-data',
                processData: false,  
                contentType: false,
                success: function(jd){
                    if(jd.code=='200'){
                        $("#panel-edit-status").text("");
                        localStorage.setItem("loader",0);
                        $("#circle-loader").hide();
                        $("#saved").show();
                        setTimeout(function() 
                        {   
                            window.location="TestResult.html";
                        }, 500);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(textStatus);
                }
            
            });
        }, 2500);

        }
    });

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