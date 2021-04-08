const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// console.log(parseInt(process.argv[2]))
// console.log(process.argv)

// Connection URL
const url = 'mongodb://localhost:27017'; // ICI


let firstName = process.argv[2]
let lastName = process.argv[3]


let doc = {
    firstName: firstName
    , lastName: lastName
}

// Database Name
const dbName = 'learnyoumongo';
const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function (err) {
    assert.strictEqual(null, err);
    // console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('docs')
    collection.insertOne(doc, (err, data) => {
        if (err) throw err
        console.log(JSON.stringify(doc))
        // console.log(data)
        client.close()
    })


});

// async function insertDoc(db, client) {

//     // Insert some documents
//     const result = await collection.insertOne(doc, (err, data) => {
//         if (err) throw err
//         console.log(JSON.stringify(data))
//         // console.log(data)
//         client.close()
//     }
//     )
//     // console.log(JSON.stringify(result));
//     // console.log(result);
//     return result
// }