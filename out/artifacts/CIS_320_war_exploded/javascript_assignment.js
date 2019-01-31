function helloHuman(){
    console.log("Hello human.");
}

function addFields(){
    var x = $('#field1').val() / 1;
    var y = $('#field2').val() / 1;
    var z = x + y;

    $("#field3").val(z);
}

function hideShow(){
    $("#paragraphToHide").toggle();

    if ($("#paragraphToHide").is(":hidden")) {
        $("#button3").val("Show");
    } else{
        $("#button3").val("Hide");
    }
}

function checkPhone(){
    var phone = $("#phoneField").val();

    var reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

    if (reg.test(phone)){
        console.log("Ok");
    } else{
        console.log("Bad");
    }
}

function jsonFunction(){
    var formObject ={};

    formObject.firstName = $("#firstName").val();
    formObject.lastName = $("#lastName").val();
    formObject.email = $("#email").val();

    var jsonString = JSON.stringify(formObject);

    console.log(jsonString);
}


var formButton1 = $('#button1');
formButton1.on("click",helloHuman);

var formButton2 = $("#button2");
formButton2.on("click",addFields);

var formButton3 = $("#button3");
formButton3.on("click",hideShow);

var formButton4 = $("#button4");
formButton4.on("click",checkPhone);

var formButton5 = $("#button5");
formButton5.on("click",jsonFunction);
