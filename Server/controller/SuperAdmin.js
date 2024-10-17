var SuperAdmin = require('../models/SAdmin');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

exports.get = async (req, res) => {
    try {
        const adin = await SuperAdmin.find();
        res.send({ data: adin, message: "Super Admin Fetched Successfully", status: true })
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error fetching data" });
    }
}

exports.login = async (req, res) => {
    const { sAdminEmail, sAdminPass } = req.body;

    try {
        const sAdmin = await SuperAdmin.findOne({ sAdminEmail });

        if (!sAdmin) {
            res.send({ status: false, message: "Super Admin not found." })
            return;
        }

        const password = await bcrypt.compare(sAdminPass, sAdmin.sAdminPass)
        if (sAdmin && password) {
            const token = await jwt.sign({ id: sAdmin._id, email: sAdmin.sAdminEmail }, process.env.JWT_KEY)
            res.send({ status: true, data: sAdmin, token, message: "Login Successfully" })
        } else {
            res.send({ status: false, message: "Invalid Credentials" })
        }
    }
    catch (err) {
        console.error(err);
    }
}

exports.register = async (req, res) => {
    const { sAdminEmail, sAdminPass } = req.body;

    const superA = await SuperAdmin.find({ sAdminEmail });

    if (superA.length > 0) {
        res.send({ status: false, message: "SuperAdmin already exists" })
        return;
    }

    const hashed = await bcrypt.hash(sAdminPass, 10)
    const data = await SuperAdmin.create({ sAdminEmail, sAdminPass: hashed })
    res.send({ status: true, data, message: "Registration Successfully" })
}