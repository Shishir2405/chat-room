const message = require("../data/message");

const getMessage = (req, res) => {
  const limit = Number(20);

  res.json(message.slice(limit));
};

module.exports = {
  getMessage,
};
