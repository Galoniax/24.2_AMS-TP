import { useEffect, useState } from 'react';
import { Nullable } from '../../constants/constants';
import { ICategory } from '../../interfaces/category.interface';

interface CategoryModalProps {
  isOpen: boolean;
  initialCategory?: Nullable<ICategory>;
  onClose: () => void;
  onDelete: (categoryId: number) => void;
  onSubmit: (category: ICategory) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  initialCategory,
  onClose,
  onDelete,
  onSubmit,
}) => {
  const [category, setCategory] = useState<ICategory>({
    id: initialCategory?.id || null,
    name: initialCategory?.name || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(category);
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    } else {
      resetForm();
    }
  }, [initialCategory]);

  const resetForm = () => {
    setCategory({
      id: null,
      name: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 md:w-3/5 h-auto overflow-auto p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialCategory ? 'Editar categoria' : 'Crear categoria'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={category.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-between space-x-4">
            {initialCategory && initialCategory.id != null ? (
              <button
                type="button"
                onClick={() =>
                  initialCategory.id && onDelete(initialCategory.id)
                }
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
                {initialCategory ? 'Guardar Cambios' : 'Crear Libro'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
