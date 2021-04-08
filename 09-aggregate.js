const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// Connection URL
const url = 'mongodb://localhost:27017'; // ICI
// Database Name
const DBNAME = 'learnyoumongo';
const COLLECT = 'prices'
const PARAM = process.argv[2]

// console.log(process.argv)

const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function (err) {
    assert.strictEqual(null, err);
    // console.log('Connected successfully to server');

    const db = client.db(DBNAME);

    average(db, client)


});



async function average(db, client) {
    const collection = db.collection(COLLECT)


    //Permet de faire des fonction  d'aggregation : 
    // // .aggregate(pipeline [{}],opt, cbk) : https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#examples
    // pipeline : https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/
    await collection.aggregate([
        { $match: { size: PARAM } }
        , {
            $group: {
                _id: 'moyenne'
                , total: {
                    $avg: '$price'
                }
            }
        }

    ]).toArray(function (err, results) {
        // handle error
        let price = results[0].total
        console.log(Number(price).toFixed(2))

        client.close()
    })

}