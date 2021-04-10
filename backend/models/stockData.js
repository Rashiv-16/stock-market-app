import mongoose from "mongoose";

const schema = mongoose.Schema({
  _id: String,
  Symbol: String,
  Name: String,
  "Last Sale": String,
  "Net Change": String,
  "% Change": String,
  "Market Cap": String,
  Country: String,
  "IPO Year": String,
  Volume: String,
  Sector: String,
  Industry: String,
});

const StockData = mongoose.model("StockData", schema);

export default StockData;
