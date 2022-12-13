/** Creates login page
 *  Ashar, Nick, Yahir, Chris
 *  version 1.0.0  9/27/2022
 *          1.1.0  10/5/2022 condition valid -> grid page
 *          1.2.0  10/12/2022 condition invalid -> error page
 *			1.3.0  11/7/2022 prevent those in the database from logging 
 *                           in/filter system
 *          1.3.1  12/8/2022 added function event
 *
 *  function enter(event):  clicks button when user pushed enter key
 *  function validate():  verifies username and password are correct */

 function enter(event) {
	if (event.keyCode == 13) 
		document.getElementById("def_button").click();
 }

 function validate()
{
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	if (username =="username" && password=="password")
		{
		window.location.href = "grid.html";
		}
	else 
		{
		window.location.href = "login_error.html";
		}
}