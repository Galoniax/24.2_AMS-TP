import { useEffect, useState } from 'react';
import { IBook } from '../interfaces/book.interface';
import { fetchAllBooks } from '../services/bookService';

export const useBooks = () => {
  const [allBooks, setAllBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await fetchAllBooks();
      setAllBooks(allData);
    };

    fetchData();
  }, []);

  return { allBooks };
};
