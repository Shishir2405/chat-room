const { v4: uuidv4 } = require("uuid");

const login = (req, res) => {
  const { username } = req.body;

  res.json({
    username,
    token: uuidv4(),
  });
};

module.exports = {
  login,
};
