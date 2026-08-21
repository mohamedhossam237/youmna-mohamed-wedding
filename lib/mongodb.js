import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

const options = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000,
};

let client;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the client is not
  // recreated on every hot-reload
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
    attachDatabasePool(global._mongoClient);
  }
  client = global._mongoClient;
} else {
  // In production, always create a fresh module-scoped client
  client = new MongoClient(uri, options);
  attachDatabasePool(client);
}

export default client;
