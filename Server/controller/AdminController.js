const Admin = require('../models/Admin');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.get = async (req, res) => {
    try {
        const admin = await Admin.find();
        res.send({ status: true, data: admin, message: "Admin Data Fetched Successfully." })
    } catch (error) {
        res.send({ status: false, message: "Error from getting Admin" });
    }
}

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email });
        const psw = await bcrypt.compare(password, user.password);

        if (!user) {
            res.send({ status: false, message: "Invalid Credentials." })
            return;
        } else {
            if (user && user.password) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
                res.send({ status: true, data: user, token, message: "Login Successfully." })
            }
        }
    } catch (error) {
        res.send({ status: false, message: "Error While Logging" });
    }
}

exports.register = async (req, res) => {
    const { username, email, phone, password, website } = req.body;
    const webLogo = req.file ? req.file.path : null;
    try {
        const user = await Admin.find({ email });

        if (user.length > 0) {
            res.send({ status: false, message: "Admin Already Exists." });
            return;
        } else {
            const hashed = await bcrypt.hash(password, 10)
            const userAdd = await Admin.create({ username, email, phone, password: hashed, website, webLogo });
            res.send({ status: true, data: userAdd, message: "Admin Registered Successfully." })
        }
    } catch (error) {
        console.log("Error : ", error);
        res.send({ status: false, message: "Error While Registering" });
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const { username, email, phone, password, website } = req.body;
    const webLogo = req.file ? req.file.path : null;
    try {
        const user = await Admin.findOne({ _id: id });

        if (!user) {
            res.send({ status: false, message: "Admin Not Found." })
            return;
        } else {
            if (password) {
                let = hashed = await bcrypt.hash(password, 10)
                const userUpdate = await Admin.findByIdAndUpdate({ _id: id }, { username, email, phone, password: hashed, website })
                res.send({ status: true, message: "Admin Updated Successfully." })
            } else if (webLogo) {
                const userUpdate = await Admin.findByIdAndUpdate({ _id: id }, { username, email, phone, website, webLogo });
                res.send({ status: true, message: "Admin Updated Successfully." })
            }
            else {
                const userUpdate = await Admin.findByIdAndUpdate(id, { $set: { username, email, phone, website } })
                res.send({ status: true, message: "Admin Updated Successfully." })
            }
        }
    } catch (error) {
        res.send({ status: false, message: "Error while updating Admin" })
    }
}

exports.getSingle = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Admin.findOne({ _id: id }).select({ password: 0 });
        if (user) {
            res.send({ status: true, data: user, message: "Admin Retrieved Successfully." });
        } else {
            res.send({ status: false, message: "Admin Not Found." })
            return;
        }
    } catch (error) {
        res.send({ status: false, message: "Error while getting a admin" });
    }
}

exports.deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Admin.findOne({ _id: id });
        console.log(user);
        if (user) {
            const deleteAdmin = await Admin.findByIdAndDelete(id);
            res.status({ status: true, message: "Admin Deleted Successfully" });
        } else {
            res.status({ status: false, message: "Admin Not Found" });
            return;
        }
    } catch (error) {
        res.send({ status: false, message: "Error while deleting a admin" });
    }
}