//RENDER FUNCTIONS
const examplePublic = (req, res) => {
  res.status(200).json({ message: "You hit the public route." });
};

const examplePrivate = (req, res) => {
  res.status(200).json({ message: "You hit the private route." });
};

module.exports = { examplePublic, examplePrivate };
