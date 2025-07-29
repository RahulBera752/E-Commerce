import User from "../../models/userModel.js";


import bcrypt from "bcryptjs";

const handleSignup = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      profilePic: profilePic || "", // Optional fallback
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
};

export default handleSignup;
