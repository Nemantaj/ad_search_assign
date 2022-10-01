const Company = require("../model/Company");

exports.searchByName = (req, res, next) => {
  const searchQuery = req.query.search;

  if (!searchQuery) {
    const error = new Error("No searcch query is provided!");
    error.title = "Error Occured";
    error.statusCode = 422;
    throw error;
  }

  Company.find({ name: { $regex: searchQuery, $options: "i" } })
    .populate("details")
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
