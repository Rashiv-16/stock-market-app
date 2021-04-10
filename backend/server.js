import express from "express";
import dotenv from "dotenv";

//db config
import connectDB from "./db/db.js";

//db models
import SavedStock from "./models/savedStockData.js";
import StockData from "./models/StockData.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const test = async (req, res) => {
  let pagesize = 5;
  let page = Number(req.body.data) || 1;
  const count = await StockData.count();
  const data = await StockData.find({})
    .limit(pagesize)
    .skip(pagesize * (page - 1));

  console.log(page);
  res.json({ data, page, pages: Math.ceil(count / pagesize) });
};

app.post("/api/data", (req, res) => {
  test(req, res);
});

app.get;

const savedDataHandler = async (res) => {
  const rawdata = await SavedStock.find({});
  res.send(rawdata[0].user);
  console.log(rawdata[0].user);
};

const savingDataHandler = async (req, res) => {
  const data = await StockData.find({ Symbol: req.body.data.symbol });

  const saveit = await SavedStock.findOneAndUpdate(
    { profile_id: "yolo" },
    {
      $push: {
        user: {
          Name: data[0].Name,
          Symbol: data[0].Symbol,
          "Market Cap": data[0]["Market Cap"],
          "Net Change": data[0]["Net Change"],
        },
      },
    },
    { new: true }
  );
  saveit.save();
  console.log(data);
};

app.get("/api/saved", (req, res) => {
  savedDataHandler(res);
});

app.post("/api/saved", (req, res) => {
  savingDataHandler(req, res);
});

const deletingDataHandler = (req, res) => {
  const symbol = req.body.symbol;

  SavedStock.findOneAndUpdate(
    { profile_id: "yolo" },
    { $pull: { user: { Symbol: symbol } } },
    { safe: true, upsert: true },
    (err, data) => {
      console.log(err);
    }
  );
  // res.send("success");
};

app.delete("/api/saved", (req, res) => {
  deletingDataHandler(req, res);
});

const searchData = async (name) => {
  const data = await stockData.find({ name: name });
  res.send(data);
};

app.post("/api/search/:name", (req, res) => {
  searchData(req.params.name);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
