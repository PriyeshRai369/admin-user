import { User } from "../models/user.models.js";
import { generateToken } from "../tokens/tokens.js";
import bcrypt from 'bcrypt';

const userRegister = async (req, res) => {
    const { name, username, email, password } = await req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email or Username is already used by another user. Try another." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        const isUserCreated = await User.findById(newUser._id).select("-password");
        if (!isUserCreated) {
            return res.status(400).json({ success: false, message: "Unable to create user..." });
        }
        return res.status(201).json({ success: true, message: "User registration done.", user: isUserCreated });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export async function userLogin(req, res) {
    const { email, password } = await req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: "Unable to find user with this email . Try again.." })
    }


    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ success: false, message: "Incorect password. Try again..." })
    }

    const accessToken = await generateToken(user)
    const options = { httpOnly: false, secure: false, sameSite: 'lax', path: '/' };
    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .json({ success: true, message: "User login success", accessToken })
}

export async function userPage(req, res) {
    const user = req.user;
    if (!user) {
        return res.status(400).json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, user });
}

export async function logout(req,res ){
    const options = { httpOnly: false, secure: false, sameSite: 'lax', path: '/' };
    return res
        .status(201)
        .clearCookie("accessToken", options)
        .json({ success: true, message: "User logout successfully" })
}



export { userRegister };
