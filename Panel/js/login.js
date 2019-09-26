$(document).ready(function(){
    
    //login
    $("#email-box").focusin(function(){
        $("#email-ico").css({"color":"#57b846" } );
        $("#email-box").css({"box-shadow":"#57b846 0 0 40px" } );
    });
    $("#email-box").focusout(function(){
        $("#email-ico").css({"color":"#686868" } );
        $("#email-box").css({"box-shadow":"#57b846 0 0 0" } );
    });
    $("#pass-box").focusin(function(){
        $("#pass-ico").css({"color":"#57b846" } );
        $("#pass-box").css({"box-shadow":"#57b846 0 0 40px" } );
    });
    $("#pass-box").focusout(function(){
        $("#pass-ico").css({"color":"#686868" } );
        $("#pass-box").css({"box-shadow":"#57b846 0 0 0" } );
    });

    //login ajax
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    $("#login-btn").click(function () {
        event.preventDefault();
        var inp_email=document.getElementById("Email").value;
        var inp_pass=document.getElementById("Pass").value;
        //var inp_file=document.getElementById("uploaded_file");
        //var file=inp_file.files[0];
        if(!(inp_email!=""&&inp_pass!="")){
            if(inp_email=="" )
                $("#email-box").css({"box-shadow":"#ff4d4d 0 0 40px" } );
            if(inp_pass=="")
                $("#pass-box").css({"box-shadow":"#ff4d4d 0 0 40px" } );
                return ;
        }
        else{
            //check valid email
            if(isEmail(inp_email)==false){
                $("#email-box").css({"box-shadow":"#ff4d4d 0 0 40px" } ).delay(1000);
                alert("invalid email addres");
                return ;
            }
            //make data for api
            const datas = new FormData();
            //datas.append('uploaded_file',file);
            datas.append('email',inp_email);
            datas.append('pass',inp_pass);
            $("#log-loader").css({"width":"100%","height":"100%" });
            setTimeout(
                function() 
                {
                    $.ajax({
                        /*
                        type: 'GET',
                        url: ur="http://medvisit.ir/screenMe/api/public/loginG/"+inp_email+"/"+inp_pass,
                        */
                        type: 'POST',
                        url: 'http://medvisit.ir/screenMe/api/public/loginP',
                        data : datas,
                        enctype: 'multipart/form-data',
                        processData: false,      
                        contentType: false,
                        success: function(jd){
                            result=jd;
                            if(jd.code=='200'){
                                login=datas;
                                localStorage.setItem("email",inp_email);
                                localStorage.setItem("pass",inp_pass);
                                localStorage.setItem("loader",1);
                                login=true;
                                window.location="panel.html";
                            }
                        else if(jd.code=='4063'){
                            $("#log-loader").css({"width":"00%","height":"00%" }).delay(1000);
                            $("#pass-box").css({"box-shadow":"#ff4d4d 0 0 40px" } );
                        }
                        else if(jd.code=='404'){
                            $("#log-loader").css({"width":"00%","height":"00%" }).delay(1000);
                            $("#email-box").css({"box-shadow":"#ff4d4d 0 0 40px" } );
                        }
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            alert(textStatus);
                        }
                    });
                }, 3500);   
        }          
    });
});
