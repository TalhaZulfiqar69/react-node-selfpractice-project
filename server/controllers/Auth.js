const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registration = async (data) => {
  try {
    const hashedPassword = bcrypt.hashSync(data.password, 16);
    const userData = await User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedPassword,
    });
    return userData;
  } catch (e) {
    console.log(e);
  }
};

const login = async (data) => {
  try {
    const userData = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (userData == null) {
      const data = {
        success: false,
        message: "Username and email not found",
      };
      return data;
    }

    const validPassword = bcrypt.compareSync(
      data.password,
      userData.dataValues.password
    );

    if (validPassword == false) {
      const data = {
        success: false,
        message: "Email or password is incorrect",
      };
      return data;
    }

    const token = jwt.sign(
      { id: userData.dataValues.id },
      process.env.TOKEN_SECRET_STRING,
      {
        expiresIn: 86400,
      }
    );
    const finalData = {
      sucesss: true,
      token: token,
      user: userData,
    };

    return finalData;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  login,
  registration,
};
