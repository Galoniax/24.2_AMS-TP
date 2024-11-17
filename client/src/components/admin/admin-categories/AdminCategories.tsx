import { GrAdd } from "react-icons/gr";
import { useCategory } from "../../../hooks/useCategory";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import CategoryModal from "../../dialogs/CategoryModal";
import { ICategory } from "../../../interfaces/category.interface";
import { createCategory, deleteCategory, updateCategory } from "../../../services/categoryService";
import { toast } from "react-toastify";


const AdminCategories = () => {
  const { categories, refrehCategories } = useCategory();
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<ICategory | null>(null);

  const handleCreateOrUpdateCategory = async (category: ICategory) => {
    category.id ? await updateCategory(category.id, category) : await createCategory(category);
    toast.success(category.id ? "Categoria actualizada" : "Nueva categoria creada");
    setShowModal(false);
    setEditCategory(null);
    refrehCategories();
  };

  const handleEditClick = (category: ICategory) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (bookId: number) => {
    try {
      await deleteCategory(bookId);
      setShowModal(false);
      toast.success("Categoria eliminada");
      refrehCategories();
    } catch (error) {
      toast.error("Error al eliminar la Categoria");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center align-center px-7 mb-10">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Todas las categorías</h3>
          <button
            onClick={() => {
              setEditCategory(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            title="Añadir Categoria"
          >
            <GrAdd />
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg mt-4">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {categories?.map((category) => (
              <tr
                key={category.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{category.id}</td>
                <td className="py-3 px-6 text-left">{category.name}</td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => handleEditClick(category)} type="button" className="text-blue-600 hover:text-blue-800">
                      <BiEdit size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateOrUpdateCategory}
        initialCategory={editCategory}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default AdminCategories;