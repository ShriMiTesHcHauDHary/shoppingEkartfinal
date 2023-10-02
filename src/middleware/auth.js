const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongodb = require('mongodb');
const { isValidObjectIdauth } = require('../middleware/validator')
const authentication = async function (req, res, next) {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Please pass token" });
    }

    let splitToken = token.split(" ");


    //decode token
    try {
      const decodedToken = jwt.verify(splitToken[1], "Group-26", {
        ignoreExpiration: true,
      });

      if (Date.now() > decodedToken.exp * 1000) {
        return res
          .status(401)
          .send({ status: false, message: "session expired" });
      }
      console.log(req.userId)
      req.userId = decodedToken.userId;
    } catch (error) {
      return res
        .status(401)
        .send({ status: false, message: "Authentication failed" });
    }
    console.log("authentication successful");
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const authorization = async function (req , res , next){
  try{
   
    let userId = req.userId
    let userIdfromParam = req.params.userId
    if (!isValidObjectIdauth(userIdfromParam)) {
      return res
        .status(440)
        .send({ status: false, message: " Enter a valid userId" });
    }
    const objId = new mongodb.ObjectId(userIdfromParam);

    const userByUserId = await userModel.findById(objId)

    if (!userByUserId) {
      return res.status(404).send({ status: false, message: " User not found" })
  }

    if(userId!=userIdfromParam)
    return res.status(403).send({ status: false, message: "Unauthorized access" })

    next()
  }
  catch(err){
    return res.status(500).send({ err: err.message })
  }
  }

module.exports = { authentication, authorization };