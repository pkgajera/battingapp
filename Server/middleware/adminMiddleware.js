var jwt = require('jsonwebtoken');
var SAdmin = require('../models/SAdmin');

var authMiddleware = async (req, res, next) => {
    var token = req.header('Authorization');

    if (!token) {
        return res.status(400).json({ message: "Unauthorised HTTP ! Token Not Provided" });
    }

    try {
        const isVerified = await jwt.verify(token, process.env.JWT_KEY);
        if (isVerified) {
            const userData = await SAdmin.findOne({ email: isVerified.sAdminEmail }).select({ password: 0 });
            if (userData) {
                req.user = userData;
                token = token;
                req.userId = userData._id
            } else {
                console.log("Token not valid");
            }
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
    next();
};

module.exports = authMiddleware;