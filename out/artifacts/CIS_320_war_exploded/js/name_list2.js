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
            console.log("Done");
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
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");

    //show the hidden dialog
    $('#myModal').modal('show');
}

function savedChanges(){
    console.log("Attempting to save changes")
    $('#myModal').modal('hide');
}

//call code
updateTable();

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

var saveButton = $('#saveChanges');
saveButton.on("click", savedChanges);