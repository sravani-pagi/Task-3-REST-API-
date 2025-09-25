const express = require('express');
const { title } = require('process');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store books
let books = [
  { id: 1, title: 'The Story of My Experiments with Truth', author: 'Mahatma Gandhi' },
  { id: 2, title: 'The Interpreter of Maladies', author: 'Jhumpa Lahiri' },
  { id: 3, title: 'Gitanjali' , author: 'Rabindranath Tagore'},
  { id: 4, title: 'Midnights Children', author: 'Salman Rushdie' },
  { id: 5, title: 'The Private Life of an Indian Prince', author: 'Mulk Raj Anand' },
  { id: 6, title: 'The God of Small Things' , author: 'Arundhati Roy'},

];

// GET /books - return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const id = books.length ? books[books.length - 1].id + 1 : 1;
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author } = req.body;
  book.title = title;
  book.author = author;
  res.json(book);
});

// DELETE /books/:id - delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  books.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
