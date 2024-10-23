import axiosInterceptor from '../interceptor/axios-interceptor';
import { ApiResponse } from '../interfaces/api-response.interface';
import { IBook } from '../interfaces/book.interface';
import { IFilterBookOptions } from '../interfaces/filter-book-options.interface';

// Obtener todos los libros
export const fetchAllBooks = async (): Promise<ApiResponse<IBook[]>> => {
  const response = await axiosInterceptor.get('');
  return response.data.record.books;
};

// Filtrar libros
export const fetchBooks = async (
  options?: IFilterBookOptions,
): Promise<ApiResponse<IBook[]>> => {
  const response = await axiosInterceptor.get('', {
    params: options,
  });
  return response.data.record.books;
};

// Obtener libro por ID
export const fetchBookById = async (id: string): Promise<IBook | null> => {
  const response = await axiosInterceptor.get('');
  const books: IBook[] = response.data.record.books;
  const book = books.find(book => book.id == id);

  return book || null;
};

// Crear un nuevo libro
export const createBook = async (newBook: IBook): Promise<IBook> => {
  const response = await axiosInterceptor.post('', newBook);
  return response.data;
};

// Editar un libro por ID
export const updateBook = async (
  id: number,
  updatedBook: IBook,
): Promise<IBook> => {
  const response = await axiosInterceptor.put(`/${id}`, updatedBook);
  return response.data;
};

// Eliminar un libro por ID
export const deleteBook = async (id: number): Promise<void> => {
  await axiosInterceptor.delete(`/${id}`);
};
