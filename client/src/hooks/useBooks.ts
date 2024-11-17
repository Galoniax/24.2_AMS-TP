import { useEffect, useState } from 'react';
import { IBook } from '../interfaces/book.interface';
import { fetchAllBooks } from '../services/bookService';
import { IPagedResponse } from '../interfaces/common/page-response.interface';

export const useBooks = (
  pageNumber?: number, 
  pageSize?: number, 
  categoryId?: number
) => {
  const [allBooks, setAllBooks] = useState<IPagedResponse<IBook>>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchBooks = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const books = await fetchAllBooks(pageNumber, pageSize, categoryId);
      setAllBooks(books);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [pageNumber, pageSize, categoryId]);

  return {
    allBooks,
    refreshBooks: fetchBooks,
  };
};
