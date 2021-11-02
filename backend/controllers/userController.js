const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { database } = require("../models/modelExport");
const Op = database.Sequelize.Op;
const users = database.users;
var saltRouds = 10;
const { v4: uuidv4 } = require("uuid");
require("dotenv/config");

const userRegister = async (req, res, next) => {
  try {
    let newUser = req.body;
    await users
      .findOne({ where: { [Op.and]: [newUser.userId] } })
      .then(async (profile) => {
        if (!profile) {
          bcrypt.hash(newUser.password, saltRouds, async (err, hash) => {
            if (err) {
              console.error(err.message);
              res.send({
                message: err.message,
              });
            } else {
              newUser.userId = uuidv4();
              newUser.password = hash;
              await users
                .create(newUser)
                .then(() => {
                  res.status(200).send("User Registered");
                })
                .catch(err);
              {
                console.error("Signup Error");
              }
            }
          });
        } else {
          res.status(401).send("User already Registered");
        }
      });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const userLogin = async (req, res, next) => {
  const newUser = req.body;
  try {
    const detectedUser = await users.findOne({
      where: { username: newUser.username },
    });
    if (!detectedUser) {
      res.status(401).send("User does not exixt");
    } else {
      bcrypt.compare(
        newUser.password,
        detectedUser.password,
        async (err, result) => {
          if (err) {
            res.send({
              message: err.message,
            });
            console.error(err.message);
          } else if (result) {
            const token = jwt.sign(
              {
                id: detectedUser.userId,
                name: detectedUser.firstName + " " + detectedUser.lastName,
                email: detectedUser.email,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: "1d",
              }
            );

            res.status(200).json({
              message: "Auth Successfull",
              userDetails: {
                userId: detectedUser.userId,
                name: detectedUser.firstName + " " + detectedUser.lastName,
                email: detectedUser.email,
              },
              token: token,
            });
          } else {
            res.status(401).send("Unauthorized Access");
          }
        }
      );
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
    console.log("Error is", err.message);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
