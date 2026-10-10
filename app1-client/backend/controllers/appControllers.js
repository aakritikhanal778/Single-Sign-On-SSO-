export const getDashboard = async (req, res) => {
  res.json({
    message: "Welcome to App 1",
    user: req.user
  });
};