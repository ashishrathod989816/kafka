const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express();
var kafka = require('kafka-node');

app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'feedback',
    multipleStatements: true
});

var arr = {};
///kafka connection


Consumer = kafka.Consumer;
client = new kafka.KafkaClient({ kafkaHost: '192.168.0.124:6667' });
app.get('/topics/:name/:id', (req, res) => {





    arr['name'] = req.params.name;
    arr['id'] = req.params.id;


    if (req.params.name != null || req.params.id != null) {

        client = new kafka.KafkaClient({ kafkaHost: '192.168.0.124:6667' });
        Producer = kafka.Producer,
            KeyedMessage = kafka.KeyedMessage,








            //     //kafka producers
            producer = new Producer(client),


            payloads = [
                { topic: 'dummy', messages: JSON.stringify(arr), partitions: 1, },

            ];

        producer.on('ready', function () {
            producer.send(payloads, function (err, data) {
                res.send(data);
                //    console.log(err);

            });
        });

        producer.on('error', function (err) {


            console.log("data is not dumped")
        })




    }

})


//kafka consumers
//consumer portion
consumer = new Consumer(
    client,
    [
        { topic: 'dummy', partitions: 1, key: 'json' }
    ],
    {
        autoCommit: true,

        // fromOffset: true
    }
);

consumer.on('message', function (message) {
    var userId = JSON.parse(message.value).id;
    console.log(JSON.parse(message.value).name);
    search = `select *  from  feedback `;

    mysqlConnection.query(search, (err, rows) => {
        if (!err) {
            console.log(rows);

            // if (rows[0].total_count > 0) {
            //     console.log("hey this data is present already");



            // }

            // else {
            //     console.log("this data is not present in database");

            //     mysqlConnection.query(insert_passenger_rating, (error, result, fields) => {
            //         if (!error) {
            //             res.json(result);
            //             console.log(result);
            //         }
            //         else
            //             console.log(error);
            //     })

            // }
        }
        else
            console.log(err);
    }

    );













});

consumer.on("error", function (error) {


    console.log(error);
})








//     app.get('/kafka' , (req, res) => {

// res.send(data);

//     })


// //Configuring express server
// app.use(bodyparser.json());

// //MySQL details
// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'store',
//     multipleStatements: true
// });

// mysqlConnection.connect((err) => {
//     if (!err)
//         console.log('Connection Established Successfully');
//     else
//         console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
// });

// //Creating GET Router to fetch all the learner details from the MySQL Database
// app.get('/categories' , (req, res) => {
//     mysqlConnection.query('SELECT * FROM categories', (err, rows, fields) => {
//     if (!err){
//     res.json(rows);
//     console.log(rows);
//     }
//     else
//     console.log(err);["cat_title"]
//     })
//     } );





// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
// app.get('/api/courses', (req, res) => {

//     res.send([1, 2, 3]);
// });






app.listen(1234, () => console.log('Listening on port 1234....'));
