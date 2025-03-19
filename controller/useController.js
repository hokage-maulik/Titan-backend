


const useModel = require("../model/useModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await useModel.findOne({ email });

        if (user) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await useModel.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).send("Signup successful");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error in signup");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await useModel.findOne({ email });
        
        if (!user) {
            return res.status(400).send("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid password");
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, "private-key", { expiresIn: "1h" }); 

        return res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error during login");
    }
};



module.exports = { signup, login };
