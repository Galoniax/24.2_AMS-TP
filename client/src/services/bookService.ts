import axiosInterceptor from '../interceptor/axios-interceptor';
import { Book } from '../interfaces/book.interface';
import { IFilterBookOptions } from '../interfaces/filter-book-options.interface';

// Obtener todos los libros
export const fetchAllBooks = async (): Promise<Book[]> => {
  const response = await axiosInterceptor.get('/books');
  return response.data;
};

// Filtrar libros
export const fetchBooks = async (
  options?: IFilterBookOptions,
): Promise<Book[]> => {
  const response = await axiosInterceptor.get('/books', {
    params: options,
  });
  return response.data;
};

// Obtener libro por ID
export const fetchBookById = async (id: number): Promise<Book> => {
  const response = await axiosInterceptor.get(`/books/${id}`);
  return response.data;
};

// Crear un nuevo libro
export const createBook = async (newBook: Book): Promise<Book> => {
  const response = await axiosInterceptor.post('/books', newBook);
  return response.data;
};

// Editar un libro por ID
export const updateBook = async (
  id: number,
  updatedBook: Book,
): Promise<Book> => {
  const response = await axiosInterceptor.put(`/books/${id}`, updatedBook);
  return response.data;
};

// Eliminar un libro por ID
export const deleteBook = async (id: number): Promise<void> => {
  await axiosInterceptor.delete(`/books/${id}`);
};
