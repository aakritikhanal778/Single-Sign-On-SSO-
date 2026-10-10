export const getProfile = async (req, res) => {
  try {
    console.log("\n========== APP2 PROFILE REQUEST ==========");

    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    console.log(
      "Authenticated user:",
      req.user.username
    );

    return res.status(200).json({
      message: "User authenticated in App2",
      user: req.user
    });

  } catch (err) {

    console.log("========== APP2 PROFILE ERROR ==========");
    console.error(err.message);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};