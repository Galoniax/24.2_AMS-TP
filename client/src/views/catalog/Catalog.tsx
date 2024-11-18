import { useState } from 'react';
import CardBook from '../../components/cards/CardBook';
import Filter from '../../components/filter/Filter';
import { useBooks } from '../../hooks/useBooks';
import { Nullable } from '../../constants/constants';
import NoBooksImg from '../../assets/images/no-books.png';
import { appConfig } from '../../config/ApplicationConfig';
import { motion } from 'framer-motion';
import PaginationComponent from '../../components/pagination/PaginationComponent';

const Catalog = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<Nullable<number>>(null);
  const [pageNumber, setPageNumber] = useState(appConfig.DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(appConfig.DEFAULT_PAGE_SIZE);
  const { allBooks } = useBooks(pageNumber, pageSize, selectedCategoryId || undefined);

  const handleSelectCategory = (categoryId: number | null) => {
    setPageNumber(appConfig.DEFAULT_PAGE_NUMBER);
    setSelectedCategoryId(categoryId);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageNumber(appConfig.DEFAULT_PAGE_NUMBER);
    setPageSize(newPageSize);
  };

  return (
    <section
      className="flex flex-col sm:flex-col md:flex-row w-full px-7 py-4 items-start justify-start gap-12"
      id="catalog_section"
    >
      <Filter onSelectCategory={handleSelectCategory} />
      <div className="w-full flex flex-col items-start justify-start">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <h3 className="text-3xl font-bold">
            Catálogo <span className="font-normal">/ Libros</span>
          </h3>
          <div className="flex gap-5 items-center">
            <p>
              Mostrando <span className="font-bold">{allBooks?.totalItems || 0}</span> resultados
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
        <div className="w-full min-h-[90vh] flex flex-wrap items-start justify-start gap-2 my-5">
          <PaginationComponent
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalItems={allBooks?.totalItems || 0}
            totalPages={allBooks?.totalPages || 1}
            isLast={allBooks?.isLast || false}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          >
          
            {
              allBooks && allBooks.items.length > 0 ? 
              <motion.div className="flex gap-5 flex-wrap justify-start mt-4">
                {allBooks.items.map((book) => (
                  <CardBook key={book.id} book={book} />
                ))}
              </motion.div>
              :
              <div className='w-full h-full flex items-start justify-center py-10'>
                <div className='w-full flex flex-col items-center justify-center py-10 bg-slate-100 gap-5'>
                  <img src={NoBooksImg} alt="No se encontraron libros. Imagen generada por IA" className='w-[300px] h-[300px] object-contain' />
                  <p className='text-3xl'>Lo sentimos, no hay libros disponibles para esa categoría</p>
                </div>
              </div>
            }
          </PaginationComponent>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
