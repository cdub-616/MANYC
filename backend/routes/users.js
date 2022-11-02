/*this file has all the rest api methods, it is separated from the running file
this imports the database connection file(db_connection.js)
This is also exported to the main server file(index.js)*/
const express = require("express");
const router = express.Router();
router.use(express.json());
const db = require('./db_connection');//routing the database connection file so we can query the data
router.get('/', (req, res) => {
    db.query('select * from employee_changes',(err, result) => {
        if(err){
            res.send("cannot get data from database, check get api");
        }else{
            res.send(result);
        }
    })
});
router.get('/:id', (req, res) =>{
    let id = req.params.id;
    db.query('select * from employee_changes where id = ' + id, (err,result) =>{
        if(err){
            res.send("cannot get data from database, check get id api" + err);
        }else{
            res.send(result);
        }
    });
});
router.post('/', (req, res)=>{
    const data = req.body;
    db.query('INSERT INTO employee_changes SET ?', data,(err, result) =>{
        if(err){
            res.send('cannot post data to database, check post api' );
        }else{
            res.send('data has been entered into the database');
        }
    });
});
router.patch('/:id', (req, res) =>{;
    const id = req.params.id;
    const data = req.body;
    db.query('UPDATE employee_changes SET ? WHERE id = '+ id, data,(err, result) =>{
        if(err){
            res.send('cannot edit the database check patch api ' + err);
        }else{
            res.send('user with the id ' + id + ' has been updated' + result);
        }
    });
});
router.delete('/:id', (req, res) =>{
    let id = req.params.id;
    db.query("DELETE from employee_changes where id = " + id,(err, result) =>{
        if(err){
            res.send("cannot delete data from the database, check delete api" + err);
        }else{
            res.send(id+ " has been deleted");
        }
    });
});

module.exports = router; //to make use of the file in the main server file