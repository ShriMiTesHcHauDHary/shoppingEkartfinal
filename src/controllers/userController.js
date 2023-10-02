const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isValid, isValidObjectId, isValidRequestBody, isValidFiles, nameRegex, passwordRegex,
  phoneRegex, pincodeRegex, emailRegex, } = require("../middleware/validator");
const { uploadFile } = require("../aws/aws");

const createUser = async function (req, res) {
  try {
    //reading input
    let body = req.body;
    let { fname, lname, phone, email, password, address } = body;

    //empty request body
    if (!isValidRequestBody(body)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide input" });
    }

    //mandatory fields
    if (!isValid(fname)) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide fname" });
      }
    }

    if (!isValid(lname)) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide lname" });
      }
    }

    if (!isValid(email)) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide email" });
      }
    }

    if (!isValid(phone)) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide phone" });
      }
    }

    if (!isValid(password)) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide password" });
      }
    }

    if (!isValid(address)) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide address" });
      }
    }

    if (address) {
      const parsedAddress = JSON.parse(body.address);
      address = parsedAddress;
      body.address = address
      if (!isValid(address.shipping)) {
        return res.status(400).send({ status: false, message: "Shipping address is required" })
      }
      if (!isValid(address.shipping.street)) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide street" });
        }
      }

      if (!isValid(address.shipping.city)) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide city" });
        }
      }

      if (!isValid(address.shipping.pincode)) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide pincode" });
        }
      }

      if (!pincodeRegex.test(address.shipping.pincode)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid pincode " });
      }

      if (!isValid(address.billing)) {
        return res.status(400).send({ status: false, message: "Billing address is required" })
      }
      if (!isValid(address.billing.street)) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide street" });
        }
      }

      if (!isValid(address.billing.city)) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide city" });
        }
      }

      if (!isValid(address.billing.pincode)) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide pincode" });
        }
      }

      if (!pincodeRegex.test(address.billing.pincode)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid pincode " });
      }
    }

    //format validation using regex

    if (!nameRegex.test(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid fname " });
    }

    if (!nameRegex.test(lname)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid lname " });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid emailId " });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Please provide a valid password - Password should include atleast one special character, one uppercase, one lowercase, one number and should be b/w 8-15 characters",
      });
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).send({
        status: false,
        message: "Please provide a valid indian phone number ",
      });
    }

    //unique key validation
    let checkEmail = await userModel.findOne({ email: body.email });
    if (checkEmail) {
      return res.status(400).send({
        status: false,
        message: `${body.email} already exist use different email`,
      });
    }
    let checkPhone = await userModel.findOne({ phone: body.phone });
    if (checkPhone) {
      return res.status(400).send({
        status: false,
        message: `${body.phone} already exist use different phone number`,
      });
    }

    //encrypt password
    // let securePassword = body.password;

    // const encryptedPassword = async function (securePassword) {
    //   const passwordHash = await bcrypt.hash(securePassword, 10);  //12
    //   body.password = passwordHash;
    // };
    // encryptedPassword(securePassword);
    const passwordHash = await bcrypt.hash(body.password, 10);  //12
    body.password = passwordHash

    //-----------------upload profileImage---------------------

    let files = req.files;
    if (files && files.length > 0) {
      //upload to s3 and get the uploaded link
      // res.send the link back to frontend/postman
      let uploadProfileImage = await uploadFile(files[0]); //upload file
      body.profileImage = uploadProfileImage;
    } else {
      return res
        .status(400)
        .send({ status: false, message: "please upload profile image" });
    }

    //create body
    let userCreated = await userModel.create(body);
    res.status(201).send({ status: true, message: "User created successfully", data: userCreated, });
  } catch (error) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      message: error.message,
    });
  }
};


//==========================================login api==================================
const login = async function (req, res) {
  try {
    let body = req.body;
    const { email, password } = body;
    if (!isValidRequestBody(body)) {
      return res
        .status(400)
        .send({ status: false, message: "pls provide details to login" });
    }

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "pls provide valid email" });
    }
    // regex validation for email

    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: false,
        message: `${email} should be a valid email address`,
      });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "pls provide valid password" });
    }

    // regex validation for passwrd

    if (!passwordRegex.test(password)) {
      return res.status(400).send({
        status: false,
        message: `Password length should be A Valid Password And Length Should Be in between 8 to 15 `,
      });
    }

    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .send({ status: false, msg: "Invalid credentials" });
    }
    const passwordDetails = await bcrypt.compare(body.password, user.password);
    if (!passwordDetails) {
      return res.status(400).send({
        status: false,
        message: "password is incorrect pls provide correct passwords",
      });
    }
    // after sucessfully enter email and password ,create a token

    const token = jwt.sign(
      {
        userId: user._id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 180,
      },
      "Group-26"
    );
    res.setHeader("Authorization", token);
    return res.status(200).send({
      status: true,
      message: "User login successfull",
      data: { userId: user._id, token: token },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const getUser = async function (req, res) {
  try {
    let user = req.params.userId;

    let data = await userModel.findById(user);

    return data
    ? res
        .status(200)
        .send({ status: true, message: "User profile details", data: data })
    : res
        .status(400)
        .send({
          status: false,
          message: "No user found!",
        });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};


//---------------------update user---------------------------

const updateUser = async function (req, res) {
  try {
    let data = req.body;

    if (!isValidRequestBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide input" });
    }

    let { fname, lname, email, phone } = data;

    //update profileImage
    const files = req.files;
    let profileImage;
    if (isValidFiles(files)) {
      const profilePicture = await uploadFile(files[0]);

      profileImage = profilePicture;
    }

    //format validation using regex
    if (fname) {
      if (!nameRegex.test(fname)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid fname " });
      }
    }

    if (lname) {
      if (!nameRegex.test(lname)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid lname " });
      }
    }

    if (email) {
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid emailId " });
      }

      const isEmailAlreadyExist = await userModel.findOne({ email: email });

      if (isEmailAlreadyExist) {
        return res
          .status(400)
          .send({ status: false, message: `${email} is already exist` });
      }
    }

    if (phone) {
      if (!phoneRegex.test(phone)) {
        return res.status(400).send({
          status: false,
          message: "Please provide a valid indian phone number ",
        });
      }

      const isPhoneAlreadyExist = await userModel.findOne({ phone: phone });

      if (isPhoneAlreadyExist) {
        return res
          .status(400)
          .send({ status: false, message: `${phone} is already exist` });
      }
    }

    let password;
    if (data.password) {
      if (!passwordRegex.test(data.password)) {
        return res.status(400).send({
          status: false, message: "Password length should be of minimum 8 and maximum 15 characters",
        });
      }

      password = await bcrypt.hash(data.password, 10);
    }

    // let address = JSON.parse(JSON.stringify(data));
    if (data.address) {
      const address = JSON.parse(data.address);
      data.address = address;
      const shipping = address.shipping;
      if (shipping) {
        if (shipping.pincode) {
          if (!pincodeRegex.test(shipping.pincode)) {
            return res
              .status(400)
              .send({ status: false, message: "enter valid pincode" });
          }
          
        }
      }

      const billing = address.billing;
      if (billing) {
        if (billing.pincode) {
          if (!pincodeRegex.test(billing.pincode)) {
            return res
              .status(400)
              .send({ status: false, message: "enter valid pincode" });
          }
        }
      }
    }



    const newData = { fname, lname, email, phone, password, profileImage };
    console.log(newData)

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.userId },
      newData,
      { new: true }
    );

    if (data.address) {
      const shipping = data.address.shipping;
      if (shipping) {
        if (shipping.street) {
          updatedUser.address.shipping.street = shipping.street;
        }
        if (shipping.city) {
          updatedUser.address.shipping.city = shipping.city;
        }
        if (shipping.pincode) {
          updatedUser.address.shipping.pincode = shipping.pincode;
        }
      }

      const billing = data.address.billing;
      if (billing) {
        if (billing.street) {
          updatedUser.address.billing.street = billing.street;
        }
        if (billing.city) {
          updatedUser.address.billing.city = billing.city;
        }
        if (billing.pincode) {
          updatedUser.address.billing.pincode = billing.pincode;
        }
      }
    }

    updatedUser.save();
    return res.status(200).send({
      status: true,
      message: "User profile updated",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createUser, getUser, login, updateUser };