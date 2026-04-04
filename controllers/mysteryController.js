const Mystery = require("../models/mysteryModel");

exports.alias = (req, res, next) => {
  req.url =
    "/?sort=-ratingsAverage,price&fields=ratingsAverage,price,name,difficulty,summary&limit=5";
  next();
};

exports.getAllMysteries = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|le)\b/g, (match) => `$${match}`);
    let query = Mystery.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numMysteries = await Mystery.countDocuments();
      if (skip > numMysteries) throw new Error("Page does not exist");
    }

    const mysteries = await query;

    res.status(200).json({
      status: "success",
      results: mysteries.length,
      data: {
        mysteries: mysteries,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getMystery = async (req, res) => {
  try {
    const mystery = await Mystery.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        mystery,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createMystery = async (req, res) => {
  try {
    const newMystery = await Mystery.create(req.body);
    res.status(201).json({
      status: "success",
      mystery: newMystery,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateMystery = async (req, res) => {
  try {
    const mystery = await Mystery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        mystery,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteMystery = async (req, res) => {
  try {
    const mystery = await Mystery.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        mystery,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
