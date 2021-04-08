const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// Connection URL
const url = 'mongodb://localhost:27017'; // ICI
// Database Name
const dbName = process.argv[2];
const collectName = process.argv[3];
const id = process.argv[4];



const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function (err) {
    assert.strictEqual(null, err);
    // console.log('Connected successfully to server');

    const db = client.db(dbName);

    removeDoc(db, client)


});

async function removeDoc(db, client) {
    const collection = db.collection(collectName)

    await collection.deleteOne(
        { _id: id }
        , (err, data) => {
            if (err) throw err
            client.close()
        }
    )
}
