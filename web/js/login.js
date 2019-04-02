// This calls our back-end Java program that sets our session info
function setSessionJava() {

    var url = "api/login_servlet";

    // Grab data from the HTML form
    //var sessionKey = $("#sessionKey").val();
    var username = $("#loginID").val();

    // Create a JSON request based on that data
    var dataToServer = {loginID : username};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Logging in.");
        console.log(dataFromServer);
        // Clear the form
        $("#sessionKey").val("");
        $("#sessionValue").val("");
    });
    //getSessionJava();
}

// This gets session info from our back-end servlet.
function getSessionJava() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result
        $('#getSessionResult').html(dataFromServer)
    });
}

// This method calls the servlet that invalidates our session
function invalidateSessionButton() {

    var url = "api/log_out_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Logging out.");
        console.log(dataFromServer);
    });
    //getSessionJava();
}

// Hook the functions above to our buttons
button = $('#getSessionJava');
button.on("click", getSessionJava);


button = $('#setSessionJava');
button.on("click", setSessionJava);
button.on("click", getSessionJava);

button = $('#logOut');
button.on("click", invalidateSessionButton);
button.on("click", getSessionJava);

getSessionJava();