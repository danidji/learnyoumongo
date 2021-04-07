const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// console.log(parseInt(process.argv[2]))

// Connection URL
const url = 'mongodb://localhost:27017/learnyoumongo'; // ICI

// Database Name
const dbName = 'learnyoumongo';
const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function (err) {
    assert.strictEqual(null, err);
    // console.log('Connected successfully to server');

    const db = client.db(dbName);

    findDoc(db)


});

async function findDoc(db) {
    const collection = db.collection('parrots')

    const docs = await collection.find({
        age: { $gt: parseInt(process.argv[2]) }
    },
        //Projection pour n'afficher que certaines "colonnes" 
        {
            projection: {
                name: 1
                , age: 1
                , _id: 0 // ne s'affiche pas lors de l'envoi des résultats
            }
        }).toArray()

    console.log(docs)

    client.close();
    return docs
}