import React, { useState, useEffect } from 'react';
import { IBook } from '../../interfaces/book.interface';
import { useCategory } from '../../hooks/useCategory';
import { BsCash } from 'react-icons/bs';
import { RiStockLine } from 'react-icons/ri';
import { Nullable } from '../../constants/constants';
import { MdCloudUpload, MdDelete } from 'react-icons/md';

interface BookModalProps {
  isOpen: boolean;
  initialBook?: Nullable<IBook>;
  onClose: () => void;
  onDelete: (bookId: number) => void;
  onSubmit: (book: IBook, imageFile: File | null) => void;
}

const BookModal: React.FC<BookModalProps> = ({
  isOpen,
  initialBook,
  onClose,
  onDelete,
  onSubmit,
}) => {
  const { categories } = useCategory();
  const [book, setBook] = useState<IBook>({
    id: initialBook?.id || null,
    title: initialBook?.title || '',
    price: initialBook?.price || null,
    isOffer: initialBook?.isOffer || false,
    stock: initialBook?.stock || null,
    imageUrl: initialBook?.imageUrl || '',
    isNew: initialBook?.isNew || false,
    author: initialBook?.author || '',
    categoryId: initialBook?.categoryId || null,
  });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialBook) {
      setBook(initialBook);
      setImage(null);
    }
  }, [initialBook]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]:
        type === 'checkbox' && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(book, image);
    resetForm();
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setBook({
      id: null,
      title: '',
      price: null,
      isOffer: false,
      stock: null,
      imageUrl: '',
      isNew: false,
      author: '',
      categoryId: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 md:w-3/5 h-auto overflow-auto p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialBook ? 'Editar Libro' : 'Crear Libro'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={book.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <div className="relative">
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={book.price || ''}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            <BsCash
              className="absolute top-1/2 right-3 bg-slate-50 -translate-y-1/2 z-20"
              size={20}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={book.stock || ''}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            <RiStockLine
              className="absolute top-1/2 right-3 bg-slate-50 -translate-y-1/2 z-20"
              size={20}
            />
          </div>
          <div className="w-full flex items-center justify-center relative">
            {!image && !book.imageUrl ? (
              <label className="w-full bg-gray-200 p-5 cursor-pointer h-[300px] border-dotted border-2 border-gray-400 flex items-center flex-col justify-center">
                <MdCloudUpload className="text-gray-400" size={50} />
                <span className="text-gray-400">Subir imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative w-full h-[300px]">
                <img
                  src={image ? URL.createObjectURL(image) : book.imageUrl}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-600 text-white rounded p-2"
                  onClick={() => {
                    setImage(null);
                    if (initialBook) {
                      setBook((prev) => ({ ...prev, imageUrl: '' }));
                    }
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            )}
          </div>
          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={book.author}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isOffer"
              checked={book.isOffer}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>Oferta</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isNew"
              checked={book.isNew}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>Nuevo</span>
          </label>
          <select
            name="categoryId"
            value={book.categoryId ?? ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id || 0}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="flex justify-between space-x-4">
            {initialBook && initialBook.id != null ? (
              <button
                type="button"
                onClick={() => initialBook.id && onDelete(initialBook.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            ) : (
              <div></div>
            )}
            <div className="space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {initialBook ? 'Guardar Cambios' : 'Crear Libro'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
