import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// user registration
export const registerUser = async (req, res) => {
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to create. Try again" });
  }
};

//user login
export const loginUser = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });

    // if user does not exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    //if user exist then check the password or compare the password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if password is incorrect
    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const { password, role, ...rest } = user._doc;

    //create jwt token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        expires: token.expiresIn,
        httpOnly: true,
      })
      .status(200)
      .json({
        token,

        data: { ...rest },
        role,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to login. Try again" });
  }
};
