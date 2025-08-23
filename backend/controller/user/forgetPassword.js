import jwt from "jsonwebtoken";
import UserModel from "../../models/userModel.js";
import nodemailer from "nodemailer";

export const forgotPasswordController = async (req, res) => {
  console.log("Forgot password request received");

  // Step 0: check environment variables
  const { JWT_SECRET, EMAIL_USER, EMAIL_PASS, FRONTEND_URL } = process.env;
  if (!JWT_SECRET || !EMAIL_USER || !EMAIL_PASS || !FRONTEND_URL) {
    console.error("Missing one or more required environment variables.");
    return res.status(500).json({
      success: false,
      message: "Server misconfigured: missing environment variables",
    });
  }

  try {
    const { email } = req.body;
    console.log("Email received:", email);

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Step 1: find user
    const user = await UserModel.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Step 2: create JWT token
    let token;
    try {
      token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
      console.log("JWT token created:", token);
    } catch (jwtErr) {
      console.error("JWT Error:", jwtErr);
      return res.status(500).json({ success: false, message: "Token generation failed" });
    }

    // Step 3: create reset link
    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;
    console.log("Reset link:", resetLink);

    // Step 4: send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        html: `<p>Hello ${user.name},</p>
              <p>You requested to reset your password.</p>
              <p><a href="${resetLink}">Click here to reset your password</a></p>
              <p>This link is valid for 15 minutes.</p>`,
      });
      console.log("Email sent successfully");
    } catch (mailErr) {
      console.error("Mail Error:", mailErr);
      return res.status(500).json({
        success: false,
        message: "Failed to send email. Check your SMTP configuration.",
      });
    }

    // Step 5: success
    return res.json({ success: true, message: "Password reset email sent successfully" });

  } catch (error) {
    console.error("Forgot Password Controller Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
