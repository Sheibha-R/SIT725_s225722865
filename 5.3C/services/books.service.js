const Book = require("../models/book.model");

async function getAllBooks() {
  // lean + getters for Decimal128 -> string
  return Book.find({}).lean({ getters: true });
}

async function getBookById(id) {
  return Book.findOne({ id }).lean({ getters: true });
}

module.exports = {
  getAllBooks,
  getBookById,
};
