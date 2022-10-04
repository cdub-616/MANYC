/** Creates login page
 *  Ashar, Nick
 *  version 1.0.0  9/27/2022
 *
 *  validate() verifies username and password are correct */
 
 function validate()
{
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	if (username =="username" && password=="password")
		{
		alert("login succesfully");
		}
	else 
		{
		alert("login failed")
		}
}
