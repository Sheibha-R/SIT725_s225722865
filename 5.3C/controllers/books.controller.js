const booksService = require("../services/books.service");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await booksService.getAllBooks();
    return res.status(200).json({
      statusCode: 200,
      data: books,
      message: "Books retrieved successfully",
    });
  } catch (err) {
    return next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await booksService.getBookById(id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: `Book with id '${id}' not found`,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: book,
      message: "Book retrieved successfully",
    });
  } catch (err) {
    return next(err);
  }
};
