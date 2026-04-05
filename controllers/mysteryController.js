const Mystery = require("../models/mysteryModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.aliasTopMysteries = (req, res, next) => {
  req.url =
    "/?sort=-ratingsAverage,price&fields=ratingsAverage,price,name,difficulty,summary&limit=5";
  next();
};

exports.getAllMysteries = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Mystery.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const mysteries = await features.query;

  res.status(200).json({
    status: "success",
    results: mysteries.length,
    data: {
      mysteries: mysteries,
    },
  });
});

exports.getMystery = catchAsync(async (req, res, next) => {
  const mystery = await Mystery.findById(req.params.id);
  if (!mystery) {
    return next(new AppError(`No mystery found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      mystery,
    },
  });
});

exports.createMystery = catchAsync(async (req, res, next) => {
  const newMystery = await Mystery.create(req.body);
  res.status(201).json({
    status: "success",
    mystery: newMystery,
  });
});

exports.updateMystery = catchAsync(async (req, res, next) => {
  const mystery = await Mystery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!mystery) {
    return next(new AppError(`No mystery found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      mystery,
    },
  });
});

exports.deleteMystery = catchAsync(async (req, res, next) => {
  const mystery = await Mystery.findByIdAndDelete(req.params.id);
  if (!mystery) {
    return next(new AppError(`No mystery found with id ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: "success",
    data: {
      mystery,
    },
  });
});
