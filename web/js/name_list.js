console.log("Hi, this is a test.");

//Main Javascript File

function updateTable(){
    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            for (var i = 0; i < json_result.length; i++) {
                console.log(json_result[i].first + " " + json_result[i].last);
            }
            console.log("Done");
        }
    );
}

//call code
updateTable();