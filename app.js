const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const mysteries = JSON.parse(
  fs.readFileSync(`${__dirname}/dev_data/data/mysteries-simple.json`),
);

const getAllMysteries = (req, res) => {
  res.status(200).json({
    status: "success",
    results: mysteries.length,
    data: {
      mysteries: mysteries,
    },
  });
};

const getMystery = (req, res) => {
  const id = req.params.id * 1;
  const mystery = mysteries.find((el) => el.id === id);
  if (!mystery) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      mystery,
    },
  });
};

const createMystery = (req, res) => {
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

const updateMystery = (req, res) => {
  const id = req.params.id * 1;
  const mystery = mysteries.find((el) => el.id === id);
  if (!mystery) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    tour: "Updated tour here...",
  });
};

const deleteMystery = (req, res) => {
  const id = req.params.id * 1;
  const mystery = mysteries.find((el) => el.id === id);
  if (!mystery) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "success",
    tour: null,
  });
};

// app.get("/api/v1/mysteries", getAllMysteries);
// app.get("/api/v1/mysteries/:id", getMystery);
// app.post("/api/v1/mysteries", createMystery);
// app.patch("/api/v1/mysteries/:id", updateMystery);
// app.delete("/api/v1/mysteries/:id", deleteMystery);

app.route("/api/v1/mysteries").get(getAllMysteries).post(createMystery);
app
  .route("/api/v1/mysteries/:id")
  .get(getMystery)
  .patch(updateMystery)
  .delete(deleteMystery);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
