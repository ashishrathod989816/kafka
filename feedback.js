const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express();


//Configuring express server
app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'feedback',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});







//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/categories/:rideDetaild/:passengerRating/:passengerComment', (req, res) => {

    search = `select count(*) as total_count  from  feedback where rideDetailId=${req.params.rideDetaild}`;
    insert_passenger_rating = `INSERT INTO feedback (rideDetailId,passengerRating,passengerComments) value(${req.params.rideDetaild},${req.params.passengerRating},${req.params.passengerComment})`;
    mysqlConnection.query(search, (err, rows) => {
        if (!err) {


            console.log(rows[0].total_count);
            res.send(rows)




            if (rows[0].total_count > 0) {
                console.log("hey this data is present already");



            }

            else {
                console.log("this data is not present in database");

                mysqlConnection.query(insert_passenger_rating, (error, result, fields) => {
                    if (!error) {
                        res.json(result);
                        console.log(result);
                    }
                    else
                        console.log(error);
                })

            }
        }


        else
            console.log(err);


    }






    );


});






// } );



app.get('/test/:words', (req, res) => {
    res.json([req.params.words]);

});

app.listen(1234, () => console.log('Listening on port 1234....'));
