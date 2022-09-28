/**Creates a demo array to act as database for grid app.
*  Chris Wright
*  version 1.0.0  9/27/2022*/

function status_array () {
   const status = [];
   var out = "logged out";
   var able = "available";
   var call = "on voice call";
   var work = "after call work";
   var task = "on preview task";
   for (var i = 0; i < 2000; i++) {
      status.push(out);
	  status.push(able);
	  status.push(call);
	  status.push(work);
	  status.push(task);
   }
}