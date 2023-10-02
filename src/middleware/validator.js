const mongoose = require("mongoose");
const ObjectId=require("mongoose").Types.ObjectId

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const isValidFiles = function (files) {
  if (files && files.length > 0) return true;
};

const validFileRegex = /^.+\.(?:(?:[dD][oO][cC][xX]?)|(?:[pP][dD][fF])|(?:[pP][nN][gG])|(?:[jJ][pP][gG]))$/


const isValidSize = function (size) {

  const validSize = size.split(",").map(x => x.toUpperCase().trim())
  let uniqueValidSize = validSize.filter((item,
    index) => validSize.indexOf(item) === index);

  let sizes = ["S", "XS", "M", "X", "L", "XXL", "XL"]

  for (let i = 0; i < validSize.length; i++) {
    if (!sizes.includes(validSize[i])) {
      return false
    }
  }
  return uniqueValidSize
}

const nameRegex = /^[a-zA-Z]{2,30}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

const pincodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;

const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const decimalNumRegex = /^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/

const isValidObjectIdauth = function (data) {
  let stringId = data.toString().toLowerCase();
  if (!ObjectId.isValid(stringId)) {
      return false;
  }

  var result = new ObjectId(stringId);
  if (result.toString() != stringId) {
      return false;
  }
  return true;
}

module.exports = {
  isValid,
  isValidObjectId,
  isValidRequestBody,
  isValidFiles,
  nameRegex,
  passwordRegex,
  phoneRegex,
  pincodeRegex,
  emailRegex,
  decimalNumRegex,
  isValidSize,
  validFileRegex,
  isValidObjectIdauth
};