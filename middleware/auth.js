function authorise(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.status(403).json({ message: "You are not authorized to see that." });
  }
}

module.exports = {
  authorise,
};
