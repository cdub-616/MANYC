/** Creates login page
 *  Ashar, Nick
 *  version 1.0.0  9/27/2022
 *          1.1.0  10/5/2022 condition valid -> grid page
 *          1.2.0  10/12/2022 condition invalid -> error page
 *
 *  validate() verifies username and password are correct */
 
 function validate()
{
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	if (username =="username" && password=="password")
		{
		window.location.href = "dynamic_grid.html";
		}
	else 
		{
		window.location.href = "login_error.html";
		}
}
