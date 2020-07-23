const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });

    if (targetUser) {
        const isCorPW = bc.compareSync(password, targetUser.password);

        if (isCorPW) {
            const payload = { name: targetUser.name, id: targetUser.id };
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: Number(process.env.EXPIRES_TIME) });

            res.status(200).send({
                message: "Login Successful.",
                access_token: token,
                accessToken: token
            });

        } else {
            res.status(400).send({ message: "Username or password is wrong." });
        }

    } else {
        res.status(400).send({ message: "Username or password is wrong." });
    }
};

const register = async (req, res) => {
    const { username, password, name } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });

    if (targetUser) {
        res.status(400).send({ message: "Username Already Taken." });
    } else {
        const salt = bc.genSaltSync(Number(process.env.SALT_ROUND));
        const hashedPW = bc.hashSync(password, salt);

        await db.User.create({
            password: hashedPW,
            username,
            name,
        });

        res.status(201).send({ message: "User created." });
    }

};

module.exports = {
    login,
    register
};