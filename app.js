const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect(
  "mongodb+srv://libraryUser:lib404@librarycluster.lqldlo5.mongodb.net/?appName=libraryCluster"
)
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error(err));

async function getAllBooks() {
  const books = await Book.find();
  console.log(books);
}

async function getBooksByCategory(category) {
  const books = await Book.find({ category });
  console.log(books);
}

async function getBooksAfter2015() {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  console.log(books);
}

async function updateCopies(bookId, change) {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.availableCopies + change < 0) {
    throw new Error("Negative stock not allowed");
  }

  book.availableCopies += change;
  await book.save();
  console.log("Copies updated");
}

async function changeCategory(bookId, newCategory) {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (!newCategory) {
    throw new Error("Invalid update");
  }

  book.category = newCategory;
  await book.save();
  console.log("Category updated");
}

async function deleteIfNoCopies(bookId) {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.availableCopies !== 0) {
    throw new Error("Cannot delete book with available copies");
  }

  await Book.findByIdAndDelete(bookId);
  console.log("Book deleted");
}

// getAllBooks();
// getBooksByCategory("Self-Help");
// getBooksAfter2015();
// updateCopies("BOOK_ID_HERE", -1);
// changeCategory("BOOK_ID_HERE", "Technology");
// deleteIfNoCopies("BOOK_ID_HERE");