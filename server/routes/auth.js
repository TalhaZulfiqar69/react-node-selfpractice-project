require("dotenv").config();
const express = require("express");
const router = express.Router();

const Auth = require("../controllers/Auth");
/* registration. */
router.post("/register", async (req, res, next) => {
  try {
    if (req.body.password != req.body.confirmPassword) {
      return res.send(400, {
        success: false,
        message: "password and confirm password not match",
      });
    }
    const response = await Auth.registration(req.body);

    return res.send(200, {
      success: true,
      message: "user registered successfully",
      data: response,
    });
  } catch (e) {
    console.log(e);
  }
});

/* login. */
router.post("/login", async (req, res, next) => {
  try {
    const loginResponse = await Auth.login(req.body);
    console.log("the login response ahahahahha", loginResponse);

    return res.send(loginResponse);
  } catch (e) {
    console.log(e);
  }
});

/* forget password. */
router.get("/forget-password", (req, res, next) => {
  res.send("forget-password route is hitts");
});

/* reset password. */
router.get("/reset-password", (req, res, next) => {
  res.send("reset-password route is hitts");
});

module.exports = router;
