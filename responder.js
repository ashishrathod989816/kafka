const cote = require("cote");
const express = require("express");
const mysql = require("mysql");
const bodyparse = require("body-parser");
const app = express();


var mysqlConnection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "feedback",
        multipleStatements: true
    }
)







const feedback = new cote.Responder({ name: 'responder first', namespace: "hello", key: 'feedback' });

const client1 = new cote.Requester({ name: 'Client1',namespace:'pay', key: "payment" });
var payment = {type: "single payment", userId: "2"};

client1.send(payment,(data) => {
  console.log(data);

});

feedback.on('feedback', (req, cb) => {
    
    console.log(req);

    mysqlConnection.connect((err) => {
        if (!err) {
            console.log('Connection Established Successfully with feedback');
            search = `select * from  feedback`;
            mysqlConnection.query(search, (err, rows) => {



                cb({ "status": "true", "data": rows });



            })

        }
        else {
            console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
            cb({ "status": err });
        }

    });



});


feedback.on('single_fetch', (req, cb) => {

    var userId = req.userId;
    console.log(userId);
    console.log(req);

    mysqlConnection.connect((err) => {
        if (!err) {
            console.log('Connection Established Successfully with feedback');
            search = `select * from  feedback where rideDetailId=${userId} `;
            mysqlConnection.query(search, (err, rows) => {



                cb({ "status": "true", "data": rows });

            })

        }
        else {
            console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
            cb({ "status": err });
        }




    });

}

)


