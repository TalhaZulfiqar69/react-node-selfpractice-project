const express = require("express");
const router = express.Router();

const db = require('../models')
const User = db.User;
const Op = db.Sequelize.Op;
/* registration. */
router.post("/register",async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, confirmPassword } = req.body
        
        if(password != confirmPassword) {
            return res.send(400, {
                success: false,
                message: 'password and confirm password not match'
            })
        }
        
        const data = await User.create ({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
        })

        console.log("the data", data)

        return res.send(200, {
            success: true,
            message: "user registered successfully",
            data: data
        })
    } catch (e) {
        console.log(e)
    }

});

/* login. */
router.get("/login", (req, res, next) => {
  res.send("login route is hitts");
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
