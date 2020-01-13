const cote = require("cote");
const mysql=require("mysql");


const payment= new cote.Responder({ name: 'responder second',namespace:"pay",key:'payment' });
payment.on("payment", (req, cb) => {

    console.log(req);
    
        var  mysqlConnection=mysql.createConnection(
            {
          host:"localhost",
          user:"root",
          password:"",
          database:"payment",
          multipleStatements:true
            }
        )
    
        mysqlConnection.connect((err) => {
            if (!err){
    
                search = `select * from  payment`;
                mysqlConnection.query(search,(err,rows)=>{
    
                    console.log('Connection Established Successfully with payment ');
                    cb({"data":rows});
    
                })
               
            }
            else
            {
                console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
                cb({"status":err});
            }
        
        
            });
    
    
       
    });



    payment.on("single payment", (req, cb) => {

        console.log(req);
        
            var  mysqlConnection=mysql.createConnection(
                {
              host:"localhost",
              user:"root",
              password:"",
              database:"payment",
              multipleStatements:true
                }
            )
        
            mysqlConnection.connect((err) => {
                if (!err){
        
                    search = `select * from  payment where rideDetailId=${req.userId}`;
                    mysqlConnection.query(search,(err,rows)=>{
        
                        console.log('Connection Established Successfully with payment ');
                        cb({"status":"true","data":rows});
        
                    })
                   
                }
                else
                {
                    console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
                    cb({"status":err});
                }
            
            
                });
        
        
           
        });
    
    





















