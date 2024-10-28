import { useState } from "react";
import { useSelector } from "react-redux";
import { useBooks } from "../../../hooks/useBooks";
import CardBook from "../../cards/CardBook";
import { motion } from "framer-motion";
import { GrAdd } from "react-icons/gr";
import { createBook, deleteBook, updateBook } from "../../../services/bookService";
import { IBook } from "../../../interfaces/book.interface";
import { RootState } from "../../../store";
import BookModal from "../../dialogs/BookModal";
import { toast } from "react-toastify";

const AdminBooks = () => {
  const currentUser = useSelector((state: RootState) => state.auth);
  const userRole = currentUser?.user_data?.role || null;

  const { allBooks, refreshBooks } = useBooks();
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState<IBook | null>(null);

  const handleCreateOrUpdateBook = async (book: IBook) => {
    book.id ? await updateBook(book.id, book) : await createBook(book);
    toast.success(book.id ? "Libro actualizado" : "Nuevo libro creado");
    setShowModal(false);
    setEditBook(null);
    refreshBooks();
  };

  const handleEditClick = (book: IBook) => {
    setEditBook(book);
    setShowModal(true);
  };

  const handleDelete = async (bookId: number) => {
    try {
      await deleteBook(bookId);
      setShowModal(false);
      toast.success("Libro eliminado");
      refreshBooks();
    } catch (error) {
      toast.error("Error al eliminar el libro");
      console.error("Error al eliminar el libro:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center align-center px-7 mb-10">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Todos los libros</h3>
          <button
            onClick={() => {
              setEditBook(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            title="Añadir libro"
          >
            <GrAdd />
          </button>
        </div>
        <motion.div className="flex gap-5 flex-wrap justify-start mt-4">
          {allBooks.map((book) => (
            <CardBook
              key={book.id}
              book={book}
              showButton={false}
              userRole={userRole || null}
              onEditBook={handleEditClick}
            />
          ))}
        </motion.div>
      </div>
      <BookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateOrUpdateBook}
        initialBook={editBook}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminBooks;
