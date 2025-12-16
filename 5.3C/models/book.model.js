const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    summary: { type: String, required: true },

    // Price stored as Decimal128 (AUD)
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      get: (v) => (v ? v.toString() : v),
    },
    currency: { type: String, required: true, default: "AUD" },
  },
  {
    toJSON: {
      getters: true,
      virtuals: false,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Book", BookSchema);
