const Ad = require("../model/Ad");

exports.searchByName = (req, res, next) => {
  const searchQuery = req.query.search;

  if (!searchQuery) {
    const error = new Error("No searcch query is provided!");
    error.title = "Error Occured";
    error.statusCode = 422;
    throw error;
  }

  Ad.find({
    $or: [
      { headline: { $regex: searchQuery, $options: "i" } },
      { slogan: { $regex: searchQuery, $options: "i" } },
      { desc: { $regex: searchQuery, $options: "i" } },
      { companyName: { $regex: searchQuery, $options: "i" } },
    ],
  })
    .populate("details", ["url"])
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
