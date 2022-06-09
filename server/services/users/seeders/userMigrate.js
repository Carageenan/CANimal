const { MongoClient } = require("mongodb");
const data = require("./user-migrate.json");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_ATLAS_URI || "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("CANimal");
    const users = database.collection("Users");
    data.forEach((el) => {
      el.idSQL = el.id;
      delete el.id;
    });

    const insertUsers = await users.insertMany(data);

    console.log(insertUsers);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
