/** Creates login page
 *  Ashar, Nick, Yahir
 *  version 1.0.0  9/27/2022
 *          1.1.0  10/5/2022 condition valid -> grid page
 *          1.2.0  10/12/2022 condition invalid -> error page
 *			1.3.0  11/7/2022 prevent those in the database from logging 
 *                           in/filter system
 *
 *  validate() verifies username and password are correct */
 function validate()
{
	//Saving for back up
	
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
	
	/*const mysql = require("mysql");
	var db = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'password',
		database:'employees'
	});
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	
	switch (username) {
		case 'ids': 
			window.location.href = "login_error.html";
			break;
		case 'username': 
			window.location.href = "grid.html";
			break;
		default: 
			window.location.href = "login_error.html";
		
	}
		
	switch (password) {
		case 'password':
			window.location.href = "grid.html";
			break;
		default:
			window.location.href = "login_error.html";
	}*/	
}