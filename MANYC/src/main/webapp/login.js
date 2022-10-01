/** js file for login page
 *  Ashar
 *  version 1.0.0  9/27/2022 */
 
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