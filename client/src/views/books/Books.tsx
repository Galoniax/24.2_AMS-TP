import React, { useEffect, useRef, useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import CardBook from '../../components/cards/CardBook';
import Button from '../../components/button/Button';
import { useInView } from "react-intersection-observer";
import { useWindowSize } from '../../hooks/useWindowSize';
import { motion, useSpring } from 'framer-motion';
import PaginationComponent from '../../components/pagination/PaginationComponent';
import { appConfig } from '../../config/ApplicationConfig';

const Books: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(appConfig.DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(appConfig.DEFAULT_PAGE_SIZE);
  const { allBooks } = useBooks(pageNumber, pageSize);
  const [cardRef, inView] = useInView({ threshold: 0.5 });
  const windowSize = useWindowSize();
  const scaleProgress = useRef(useSpring(1)).current;
  const opacityProgress = useRef(useSpring(1)).current;
  
  useEffect(() => {
    if(windowSize.isMobile) {
      scaleProgress.set(1);
      opacityProgress.set(1);
    } else {
      scaleProgress.set(inView ? 1 : 0.7);
      opacityProgress.set(inView ? 1 : 0.5);
    }
  }, [inView]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageNumber(appConfig.DEFAULT_PAGE_NUMBER);
    setPageSize(newPageSize);
  };

  return (
    <motion.section className="w-[100%] h-[auto] pb-16 px-12" id="book_section" ref={cardRef}>
      <div className="my-4 flex w-full items-center justify-center gap-3">
        <Button
          text="Ofertas"
          className="mr-2"
          size="md"
          type="button"
          extraArgs={[
            'rounded-full'
          ]}
        />
        <Button
          text="Nuevos"
          size="md"
          type="button"
          extraArgs={[
            'rounded-full',
          ]}
        />
      </div>
      <div className="w-[100%] flex flex-col">
        <h3 className="text-3xl">Libros Destacados</h3>
        <div className="w-[300px] h-[1px] bg-slate-400 my-2"></div>
        <PaginationComponent
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalItems={allBooks?.totalItems || 0}
          totalPages={allBooks?.totalPages || 1}
          isLast={allBooks?.isLast || false}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        >
          <motion.div className="flex gap-5 flex-wrap justify-start mt-4">
            {(allBooks && allBooks.items.length > 0) && allBooks.items.map((book) => (
              <CardBook key={book.id} book={book} />
            ))}
          </motion.div>
        </PaginationComponent>
      </div>
    </motion.section>
  );
};

export default Books;
