import { useEffect, useState } from "react";
import { Book } from "../interfaces/book.interface";
import { IFilterBookOptions } from "../interfaces/filter-book-options.interface";
import { fetchBooks } from "../services/bookService";

export const useBooks = (options?: IFilterBookOptions) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const data = fetchBooks(options);
    setBooks(data);
  }, [options]);

  return { books };
};
