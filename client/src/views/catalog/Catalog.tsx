import CardBook from '../../components/cards/CardBook';
import Filter from '../../components/filter/Filter';
import { useBooks } from '../../hooks/useBooks';
import { Book } from '../../interfaces/book.interface';

const Catalog = () => {
  const { allBooks } = useBooks();

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
          <div className="flex gap-5 items-center">
            <p>
              Mostrando <span className="font-bold">10030</span> resultados
            </p>
            <select
              name="filter_by"
              id="filter_by"
              className="w-[350px] h-[40px] shadow"
            >
              <option value="null" selected disabled>
                Seleccione una categoría
              </option>
              <option value="">Ordenar por popularidad</option>
              <option value="">Ordenar por precio</option>
            </select>
          </div>
        </div>
        {/* Content - Books */}
        <div className="w-full flex flex-wrap items-start justify-center gap-2 my-5">
          {allBooks?.map((book: Book) => (
            <CardBook key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
