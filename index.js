/*This is the main file, it makes use of the users.js and db_connection.js file.
Ashar Javid*/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

//this is creating route to user.js file where all CRUD functions are located
const usersRoutes = require("./backend/users"); //not being used in this version

//this utilizes all of the files from the frontend folder
app.use(express.static('frontend'));

//line of code which utilizes all the code in the users.js file
app.use('/', usersRoutes); 

app.listen(3000, (err) =>{
    if(err){
        console.log("Server aint working");
    }else{
        console.log("Working on port 3000");
    }
});