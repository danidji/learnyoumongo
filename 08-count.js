const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// Connection URL
const url = 'mongodb://localhost:27017'; // ICI
// Database Name
const DBNAME = 'learnyoumongo';
const COLLECT = 'parrots'
const PARAM = process.argv[2]


const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function (err) {
    assert.strictEqual(null, err);
    // console.log('Connected successfully to server');

    const db = client.db(DBNAME);

    countDoc(db, client)


});



async function countDoc(db, client) {
    const collection = db.collection(COLLECT)

    await collection.countDocuments(
        //    v--- ATTENTION a ne pas oublier le + =>  permet d'indiquer que c'est un nombre entier
        { age: { $gt: +PARAM } }
        , (err, result) => {
            if (err) throw err

            console.log(result)
            client.close()
        }
    )
}