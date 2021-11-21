const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
var saltRouds = 10;
const { v4: uuidv4 } = require("uuid");
require("dotenv/config");

const userRegister = async (req, res, next) => {
  try {
    let newUser = req.body;

    await db.User.findOne({ where: { username: newUser.username } }).then(
      async (profile) => {
        console.log("aaaa4444");
        if (!profile) {
          console.log("aaaa00000");
          bcrypt.hash(newUser.password, saltRouds, async (err, hash) => {
            if (err) {
              console.log(12, "aaaaaaa");
              console.log(err.message);
              res.status(400).json({
                message: err.message,
              });
            } else {
              console.log("aaaa245532");
              newUser.userId = uuidv4();
              newUser.password = hash;
              await db.User.create(newUser)
                .then(() => {
                  res.status(200).send("User Registered");
                })
                .catch(err);
              {
                console.log("aaaa4444");
                console.log("Signup Error");
              }
            }
          });
        } else {
          console.log("aaaa3333");
          res.status(401).send("User already Registered");
        }
      }
    );
  } catch (error) {
    console.log("aaaa2222");
    res.send({
      message: error.message,
    });
  }
};

const userLogin = async (req, res, next) => {
  const newUser = req.body;
  try {
    const detectedUser = await db.User.findOne({
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

const addAddress = async (req, res, next) => {
  try {
    
    const { pincode, state, addressLine1, addressLine2, UserUserId } = req.body;
    
    await db.Address.create({
      pincode: pincode,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      state: state,
      UserUserId: UserUserId,
    }).then((address) => {
      res.status(200).json({
        address: address,
      });
    });
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    await db.User.findAll({
      where: { userId: req.params.userId },
      include: [db.Address],
    }).then((profile) => {
      res.status(200).json({
        profile: profile,
      });
    });
  } catch (error) {
    console.log;
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
  addAddress,
  getUserProfile,
};
