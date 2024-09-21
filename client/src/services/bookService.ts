import { Book } from '../interfaces/book.interface';
import { IFilterBookOptions } from '../interfaces/filter-book-options.interface';
import { allBooksMock, booksMock } from '../utils/mocks/booksMock';

export const fetchBooks = (options?: IFilterBookOptions): Book[] => {
  let filteredBooks = booksMock;

  if (options?.isOffer !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.isOffer === options.isOffer,
    );
  }

  if (options?.isNew !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.isNew === options.isNew,
    );
  }

  return filteredBooks;
};

export const fetchAllBooks = ():Book[] => {
  return allBooksMock;
}
