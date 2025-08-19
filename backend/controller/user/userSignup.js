// controller/user/handleSignup.js
import User from "../../models/userModel.js";

const handleSignup = async (req, res) => {
  try {
    let { name, email, password, profilePic } = req.body;

    // 1️⃣ Normalize email
    email = email.trim().toLowerCase();

    // 2️⃣ Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 3️⃣ Create new user (password will be hashed by pre-save hook in model)
    const newUser = new User({
      name,
      email,
      password,   // plain password → hashed automatically in model
      profilePic: profilePic || "",
    });

    await newUser.save();

    // 4️⃣ Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profilePic: newUser.profilePic || "",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

export default handleSignup;
