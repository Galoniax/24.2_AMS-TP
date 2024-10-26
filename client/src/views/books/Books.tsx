import React, { useEffect, useRef } from 'react';
import { useBooks } from '../../hooks/useBooks';
import CardBook from '../../components/cards/CardBook';
import Button from '../../components/button/Button';
import Carousel from '../../components/carousel/BookCarousel';
import { useInView } from "react-intersection-observer";
import { useWindowSize } from '../../hooks/useWindowSize';
import { motion, useSpring } from 'framer-motion';

const Books: React.FC = () => {
  const { allBooks } = useBooks();

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

  return (
    <motion.section className="w-[100%] h-[auto] pb-16 px-12" id="book_section">
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
        <motion.div className="flex gap-5 flex-wrap justify-start mt-4">
          {allBooks.map((book) => (
            <CardBook key={book.id} book={book} />
          ))}
        </motion.div>
        <h3 className="text-3xl mt-12">Todos nuestros libros</h3>
        <div className="w-[300px] h-[1px] bg-slate-400 my-2"></div>
        <motion.div className="flex gap-10 flex-wrap justify-start mt-4" 
          ref={cardRef}
          style={{
            scale: scaleProgress,
            opacity: opacityProgress,
          }}>
          <Carousel books={allBooks} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Books;
