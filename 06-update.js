const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// console.log(parseInt(process.argv[2]))

// Connection URL
const url = 'mongodb://localhost:27017'; // ICI
// Database Name
const dbName = process.argv[2];
const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function (err) {
    assert.strictEqual(null, err);
    // console.log('Connected successfully to server');

    const db = client.db(dbName);

    updateDoc(db, client)


});

async function updateDoc(db, client) {
    const collection = db.collection('users')

    await collection.updateOne(
        { username: 'tinatime' }
        , {
            $set: { age: 40 }
        }, (err, data) => {
            if (err) throw err
            client.close()
        }
    )
}
