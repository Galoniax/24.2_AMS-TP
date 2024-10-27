import { useEffect, useState } from 'react';
import { IBook } from '../interfaces/book.interface';
import { fetchAllBooks, fetchBooksByCategoryId } from '../services/bookService';
import { Nullable } from '../constants/constants';

export const useBooks = (categoryId?: Nullable<number>) => {
  const [allBooks, setAllBooks] = useState<IBook[]>([]);

  const fetchBooks = async () => {
    let books;
    if (categoryId) {
      books = await fetchBooksByCategoryId(categoryId);
    } else {
      books = await fetchAllBooks();
    }
    setAllBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, [categoryId]);

  return {
    allBooks,
    refreshBooks: fetchBooks,
  };
};
