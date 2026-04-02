const fs = require("fs");

const mysteries = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev_data/data/mysteries-simple.json`),
);

exports.checkId = (req, res, next, val) => {
  console.log(`Mystery id is ${val}`);
  const id = val * 1;
  const mystery = mysteries.find((el) => el.id === id);
  if (!mystery) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  // console.log(`New mystery is ${req.body}`);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "bad request",
      message: "Invalid mystery object - missing name or price",
    });
  }
  next();
};

exports.getAllMysteries = (req, res) => {
  res.status(200).json({
    status: "success",
    results: mysteries.length,
    data: {
      mysteries: mysteries,
    },
  });
};

exports.getMystery = (req, res) => {
  const id = req.params.id * 1;
  const mystery = mysteries.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      mystery,
    },
  });
};

exports.createMystery = (req, res) => {
  const newId = mysteries[mysteries.length - 1].id + 1;
  const newMystery = Object.assign({ id: newId }, req.body);
  mysteries.push(newMystery);
  fs.writeFile(
    `${__dirname}/dev_data/data/mysteries-simple.json`,
    JSON.stringify(mysteries),
    (err) => {
      res.status(201).json({
        status: "success",
        mystery: newMystery,
      });
    },
  );
};

exports.updateMystery = (req, res) => {
  const id = req.params.id * 1;
  const mystery = mysteries.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    tour: "Updated tour here...",
  });
};

exports.deleteMystery = (req, res) => {
  const id = req.params.id * 1;
  const mystery = mysteries.find((el) => el.id === id);
  res.status(204).json({
    status: "success",
    tour: null,
  });
};
