async function userLogout(req, res) {
  try {
    // Clear the cookie named 'token'
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "Lax",
    });

    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}

export default userLogout;
