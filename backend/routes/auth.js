const express = require('express');
const User = require('../models/User');
const { body } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'webtoken';
const fetch = require('../middleware/fetch')

//Create a new user
router.post('/createuser', [
    body('name', 'enter a valid name'),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password'),
], async (req, res) => {
    let sucess=false;
   let user = await User.findOne({ email: req.body.email });
    if (user){return res.status(400).json({ sucess,error: "User already exists with this email" })}
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: pass,
    })
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, JWT_SECRET);
    sucess=true;
    res.json({ sucess,token });
})

//Login for a user
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password'),
], async (req, res) => {
    const { email, password } = req.body;
    let sucess=false;
    let type="user";
    let user = await User.findOne({ email });
    if (!user) {return res.status(400).json({ sucess,type:type,error: "User does not exist" })}
    type="password";
    const pass2 = await bcrypt.compare(password, user.password);
    if (!pass2) {return res.status(400).json({ sucess,type:type,error: "Your password is incorrect" })}
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, JWT_SECRET);
    sucess=true;
    res.json({ sucess,token });
})

//Fetch data of the user
router.post('/getuser', fetch, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
})
module.exports = router