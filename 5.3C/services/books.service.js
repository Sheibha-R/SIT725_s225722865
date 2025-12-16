const Book = require("../models/book.model");

function normalizePrice(doc) {
  let price = doc.price;

  // If Mongo returns Decimal128 object, convert it
  if (price && typeof price === "object") {
    // Common shape when using Decimal128
    if (price.$numberDecimal) price = price.$numberDecimal;
    else if (typeof price.toString === "function") price = price.toString();
  }

  return { ...doc, price };
}

async function getAllBooks() {
  const books = await Book.find({}).lean();
  return books.map(normalizePrice);
}

async function getBookById(id) {
  const book = await Book.findOne({ id }).lean();
  return book ? normalizePrice(book) : null;
}

module.exports = {
  getAllBooks,
  getBookById,
};
