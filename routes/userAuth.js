const router = require("express").Router();
const { MongoClient, ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");
const { auth, verificationString } = require("./emailer");

const dbURL = process.env.DBURL || process.env.MONGODB_URL;

router.post("/register", async (req, res) => {
  try {
    const client = await MongoClient.connect(dbURL, {
      useUnifiedTopology: true,
    });
    const db = client.db("reset-password");
    const userData = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (!userData) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
      await db.collection("users").insertOne(req.body);
      res.status(200).json({
        message: "User successfully registered",
      });
    } else {
      res.status(404).json({
        message: "User already registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    const client = await MongoClient.connect(dbURL, {
      useUnifiedTopology: true,
    });
    const db = client.db("reset-password");
    const userData = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (userData) {
      const isValid = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (isValid) {
        res.status(200).json({
          message: "Login success",
          name: userData.fullname,
          email: userData.email,
        });
      } else {
        res.status(401).json({
          message: "Invalid credentials",
        });
      }
    } else {
      res.status(404).json({
        message: "User not registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const client = await MongoClient.connect(dbURL, {
      useUnifiedTopology: true,
    });
    const db = client.db("reset-password");
    const userData = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (userData) {
      auth(req.body.email);
      await db
        .collection("users")
        .findOneAndUpdate(
          { email: req.body.email },
          { $set: { randomString: verificationString } }
        );
      res.status(200).json({
        message: "Valid username",
      });
    } else {
      res.status(404).json({
        message: "User not registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/reset-password/:rstring", async (req, res) => {
  try {
    const client = await MongoClient.connect(dbURL, {
      useUnifiedTopology: true,
    });
    const db = client.db("reset-password");
    const userData = await db.collection("users").findOne({
      randomString: req.params.rstring,
    });
    if (userData) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
      const updated = await db
        .collection("users")
        .updateOne(
          { randomString: req.params.rstring },
          { $set: { password: req.body.password } }
        );
      if (updated) {
        await db
          .collection("users")
          .updateOne(
            { randomString: req.params.rstring },
            { $unset: { randomString: 1 } },
            false,
            true
          );

        res.status(200).json({
          message: "Password updated",
        });
      }
    } else {
      res.status(404).json({
        message: "Password not updated",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
