//RENDER FUNCTIONS
const renderPublic = (req, res) => {
  res.render("public.ejs");
};

const renderPrivate = (req, res) => {
  res.render("private.ejs");
};

module.exports = { renderPublic, renderPrivate };
