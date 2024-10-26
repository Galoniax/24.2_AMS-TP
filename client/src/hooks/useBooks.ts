import { useEffect, useState } from 'react';
import { IBook } from '../interfaces/book.interface';
import { fetchAllBooks } from '../services/bookService';

export const useBooks = () => {
  const [allBooks, setAllBooks] = useState<IBook[]>([]);

  const fetchBooks = async () => {
    const books = await fetchAllBooks();
    setAllBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    allBooks,
    refreshBooks: fetchBooks,
  };
};
