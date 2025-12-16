const express = require('express');
const router = express.Router();

// Import controllers via index.js 
const Controllers = require('../controllers');

// GET /api/books -> get all books
router.get('/', Controllers.booksController.getAllBooks);

// GET /api/books/:id -> get one book by id
router.get('/:id', Controllers.booksController.getBookById);

module.exports = router;