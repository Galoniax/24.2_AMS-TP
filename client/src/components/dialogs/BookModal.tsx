import { useEffect, useState } from 'react';
import { IBook } from '../../interfaces/book.interface';
import { createBook, updateBook } from '../../services/bookService';
import { toast } from 'react-toastify';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookToEdit?: IBook;
}

const BookModal: React.FC<IModalProps> = ({ isOpen, onClose, bookToEdit }) => {
  const [book, setBook] = useState<IBook>({
    id: 0,
    title: '',
    price: 0,
    isOffer: false,
    stock: 0,
    imageUrl: '',
    isNew: false,
    author: '',
  });

  useEffect(() => {
    if (bookToEdit) {
      setBook(bookToEdit);
    } else {
      setBook({
        id: 0,
        title: '',
        price: 0,
        isOffer: false,
        stock: 0,
        imageUrl: '',
        isNew: false,
        author: '',
      });
    }
  }, [bookToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (book.id) {
        await updateBook(book.id, book);
        toast.success('Libro actualizado con éxito');
      } else {
        await createBook(book);
        toast.success('Libro creado con éxito');
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar el libro:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-96">
        <h2 className="text-xl font-bold mb-4">
          {book.id ? 'Editar Libro' : 'Crear Libro'}
        </h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={book.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isOffer"
                checked={book.isOffer}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">En oferta</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={book.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="imageUrl"
            >
              URL de Imagen
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={book.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="isNew">
              ¿Nuevo?
            </label>
            <select
              name="isNew"
              id="isNew"
              value={book.isNew ? 'true' : 'false'}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black rounded px-4 py-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2"
            >
              {book.id ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
