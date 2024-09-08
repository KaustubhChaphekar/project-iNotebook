const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const { query, body, validationResult } = require('express-validator');



// Route 1 : createa user using :POST "/api/auth/createuser" . Doesnt require auth
const J_W_T = "Kaustubh@$%!*&^$#&&";



router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are errors , return bad request and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() })
    }
    try {
        //check whether user with same this email exits already 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "Sorry user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = { user: { id: user.id } }
        const authToken = jwt.sign(data, J_W_T);
        success = true;

        res.json({ success,authToken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

// Route 2 :Authenticate a user using :POST "/api/auth/login" . Doesnt require auth
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists().isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are errors , return bad request and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        //pull user from database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const paswwordCompare = await bcrypt.compare(password, user.password);
        if (!paswwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const data = {
            user:
            {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, J_W_T);
        success = true;
        res.json({ success,authToken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

})

// Route 3 :get loggedin user details :POST "/api/auth/getuser" . login require

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})
module.exports = router;