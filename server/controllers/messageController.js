const messages = require("../data/message");

const getMessage = (req, res) => {
  const limit = Number(req.query.limit) || 20;

  res.json(messages.slice(-limit));
};

module.exports = {
  getMessage,
};
