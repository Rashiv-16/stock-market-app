import mongoose from "mongoose";

const saveStockSchema = mongoose.Schema({
  profile_id: {
    type: String,
  },

  user: [
    {
      Name: {
        type: String,
      },
      Symbol: {
        type: String,
      },
      "Market Cap": String,
      "Net Change": String,
    },
  ],
});

const SavedStock = mongoose.model("SavedStock", saveStockSchema);

export default SavedStock;
