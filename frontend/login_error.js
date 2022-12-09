/* js for login_error page
*  Chris
*  version 1.0.0  12/8/2022
*
*  function enterError(event):  clicks button when user pushed button */

function enterError(event) {
    if (event.keyCode == 13) {
        console.log(event.keyCode)
        document.getElementById("def_button-error").click();
    }
}