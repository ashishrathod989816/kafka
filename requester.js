const cote = require('cote');






const client = new cote.Requester({ name: 'Client',namespace:"hello", key: "feedback" });
var request = { type: "single_fetch", userId: "2" }
client.send(request, (data) => {
    console.log(data);
});

