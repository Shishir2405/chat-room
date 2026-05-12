const { v4: uuidv4 } = require("uuid");

const refreshTokens = new Set();

const login = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const accessToken = uuidv4();
  const refreshToken = uuidv4();
  refreshTokens.add(refreshToken);

  res.json({
    username,
    accessToken,
    refreshToken,
  });
};

const refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.has(refreshToken)) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  const accessToken = uuidv4();

  res.json({ accessToken });
};

module.exports = {
  login,
  refresh,
};
