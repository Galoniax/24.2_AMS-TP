import { useState } from 'react';
import CardBook from '../../components/cards/CardBook';
import Filter from '../../components/filter/Filter';
import { useBooks } from '../../hooks/useBooks';
import { IBook } from '../../interfaces/book.interface';
import BookModal from '../../components/dialogs/BookModal';

const Catalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allBooks } = useBooks();

  const handleClose = (arg: boolean) => {
    setIsModalOpen(arg);
  };

  return (
    <section
      className="flex flex-col sm:flex-col md:flex-row w-full px-7 py-4 items-start justify-start gap-12"
      id="catalog_section"
    >
      <Filter />
      <div className="w-full flex flex-col items-start justify-start">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <h3 className="text-3xl font-bold">
            Catálogo <span className="font-normal">/ Libros</span>
          </h3>
          <button onClick={() => setIsModalOpen(true)}>Crear Libro</button>
          <div className="flex gap-5 items-center">
            <p>
              Mostrando <span className="font-bold">10030</span> resultados
            </p>
            <select
              name="filter_by"
              id="filter_by"
              className="w-[350px] h-[40px] shadow"
              defaultValue="null"
            >
              <option value="null" disabled>
                Seleccione una categoría
              </option>
              <option value="">Ordenar por popularidad</option>
              <option value="">Ordenar por precio</option>
            </select>
          </div>
        </div>
        {/* Content - Books */}
        <div className="w-full flex flex-wrap items-start justify-center gap-2 my-5">
          {allBooks?.map((book: IBook) => (
            <CardBook key={book.id} book={book} />
          ))}
        </div>
      </div>
      <BookModal isOpen={isModalOpen} onClose={() => handleClose(false)} />
    </section>
  );
};

export default Catalog;
