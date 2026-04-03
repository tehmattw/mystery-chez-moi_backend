const Mystery = require("../models/mysteryModel");

exports.getAllMysteries = async (req, res) => {
  try {
    const mysteries = await Mystery.find();
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
