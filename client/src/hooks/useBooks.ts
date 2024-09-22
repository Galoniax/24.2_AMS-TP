import { useEffect, useState } from 'react';
import { IBook } from '../interfaces/book.interface';
import { IFilterBookOptions } from '../interfaces/filter-book-options.interface';
import { fetchAllBooks, fetchBooks } from '../services/bookService';

export const useBooks = (options?: IFilterBookOptions) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [allBooks, setAllBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (options) {
        const data = await fetchBooks(options);
        setBooks(data);
      } else {
        const allData = await fetchAllBooks();
        setAllBooks(allData);
      }
    };

    fetchData();
  }, [options]);

  return { books, allBooks };
};
