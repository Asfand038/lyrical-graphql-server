const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.xxgqi.mongodb.net/lyricaldb?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", (error) => console.log("Error connecting to MongoLab:", error));

app.use(cors());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

module.exports = app;
