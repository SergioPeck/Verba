const mysql=require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'Verba'
});

connection.connect((err)=>{
    if (err){
        console.error('An error has occurred, err');
        return
    }
    console.log('Succesful connection DDBB');
});

module.exports=connection;