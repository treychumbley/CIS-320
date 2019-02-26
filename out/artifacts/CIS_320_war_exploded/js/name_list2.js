//Main Javascript File
//console.log("Hi, this is a test.");

function updateTable() {
    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            for (var i = 0; i < json_result.length; i++) {
                //console.log(json_result[i].id + " " + json_result[i].first + " " + json_result[i].last + " "
                   // + json_result[i].email + " " + json_result[i].phone + " " + json_result[i].birthday);
                var phoneNum = json_result[i].phone;
                var phone = phoneNum.substring(0,3) + "-" + phoneNum.substring(3,6) + "-" + phoneNum.substring(6,10);
                $('#datatable tr:last').after('<tr><td>' + json_result[i].id + '</td><td>' + json_result[i].first +
                    '</td><td>' + json_result[i].last + '</td><td>' + json_result[i].email + '</td><td>' +
                    phone + '</td><td>' + json_result[i].birthday + '</td></tr>')


            }
            console.log("Good to go");
        }
    );
}

//called when "Add Item" button is clicked
function showDialogAdd() {

    //print that we got here
    console.log("Opening add item dialog");

    //Clear out the values in the form.
    //Otherwise we'll keep values from when we last opened or hit edit.
    //I'm getting started, you  can finish.
    $('#firstName').removeClass("is-valid");
    $('#lastName').removeClass("is-valid");
    $('#birthday').removeClass("is-valid");
    $('#email').removeClass("is-valid");
    $('#phone').removeClass("is-valid");
    $('#firstName').removeClass("is-invalid");
    $('#lastName').removeClass("is-invalid");
    $('#birthday').removeClass("is-invalid");
    $('#email').removeClass("is-invalid");
    $('#phone').removeClass("is-invalid");
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");

    //show the hidden dialog
    $('#myModal').modal('show');
}

function validateFields(){
    $('#firstName').removeClass("is-valid");
    $('#lastName').removeClass("is-valid");
    $('#birthday').removeClass("is-valid");
    $('#email').removeClass("is-valid");
    $('#phone').removeClass("is-valid");
    $('#firstName').removeClass("is-invalid");
    $('#lastName').removeClass("is-invalid");
    $('#birthday').removeClass("is-invalid");
    $('#email').removeClass("is-invalid");
    $('#phone').removeClass("is-invalid");

    var valid = true;

    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{1,45}$/i;

    var Email = $("#email").val();
    var regEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    var phoneNum = $("#phone").val();
    var regPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

    var birthday = $("#birthday").val();
    var regBirthday = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/

    if (regName.test(firstName)){
        console.log(firstName + " is a valid First Name.");
        $('#firstName').addClass("is-valid");
    } else{
        console.log(firstName + " is an invalid First Name.");
        $('#firstName').addClass("is-invalid");
        valid = false;
    }

    if (regName.test(lastName)){
        console.log(lastName + " is a valid Last Name.");
        $('#lastName').addClass("is-valid");
    } else{
        console.log(lastName + " is an invalid Last Name.");
        $('#lastName').addClass("is-invalid");
        valid = false;
    }

    if (regEmail.test(Email)){
        console.log(Email + " is a valid email.");
        $('#email').addClass("is-valid");
    } else {
        console.log(Email + " is an invalid email.");
        $('#email').addClass("is-invalid");
        valid = false;
    }

    if (regPhone.test(phoneNum)){
        console.log(phoneNum + " is a valid phone number.");
        $('#phone').addClass("is-valid");
    } else{
        console.log(phoneNum + " is an invalid phone number.");
        $('#phone').addClass("is-invalid");
        valid = false;
    }

    if (regBirthday.test(birthday)){
        console.log(birthday + " is a valid Birthday.");
        $('#birthday').addClass("is-valid");
    } else{
        console.log(birthday + " is an invalid Birthday.");
        $('#birthday').addClass("is-invalid");
        valid = false;
    }

    if (valid == true){
        savedChanges();
        var newPerson = {first: firstName, last: lastName, phone: phoneNum, email: Email, birthday: birthday};
        console.log(newPerson);
        var jsonString = JSON.stringify(newPerson);
        console.log(jsonString);

        var url = "api/name_list_edit";
        //var myFieldValue = $("#jqueryPostJSONField").val();
        $.ajax({
            type: 'POST',
            url: url,
            data: jsonString,
            success: function(jsonString) {
                console.log(jsonString);
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
        console.log("Finished");

        updateTable();
    }
}

function savedChanges(){
    console.log("Attempting to save changes!")
    $('#myModal').modal('hide');
}


//call code
updateTable();

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

var saveButton = $('#saveChanges');
saveButton.on("click", validateFields);