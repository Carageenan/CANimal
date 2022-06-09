const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'
const url = process.env.MONGODB_ATLAS_URI || "mongodb://localhost:27017";
// Connection URL
const client = new MongoClient(url);

// Database Name
const dbName = "CANimal";

let db;

async function connect() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(dbName);
}

function getDB() {
  return db;
}

module.exports = {
  connect,
  getDB,
};
