const booksService = require('../services/books.service');

// GET /api/books
exports.getAllBooks = (req, res) => {
  try {
    const books = booksService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: books,
      message: 'Books retrieved successfully',
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Server error retrieving books',
    });
  }
};

// GET /api/books/:id
exports.getBookById = (req, res) => {
  try {
    const { id } = req.params;
    const book = booksService.getBookById(id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: `Book with id '${id}' not found`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: book,
      message: 'Book retrieved successfully',
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Server error retrieving the book',
    });
  }
};
