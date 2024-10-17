var User = require('../models/User');
var jwt = require('jsonwebtoken');

exports.generateToken = async (req, res) => {
    const { userId, userName, userEmail } = req.body;
    try {
        const user = await User.find({ userEmail });

        if (!user.length) {
            const token = await jwt.sign({ userId, userName, userEmail }, process.env.JWT_KEY);
            const dataAdd = await User.create({ userId, userName, userEmail, token });
            res.send({ status: true, token: token, message: "Token Generated Successfully 1" })
        } else {
            res.send({ status: true, token: user[0].token, message: "Token Generated Successfully 2" })
        }
    } catch (error) {
        res.send({ status: false, message: "Error , Generating Token." })
    }
}