import React from 'react';
import { useBooks } from '../../hooks/useBooks';
import CardBook from '../../components/cards/CardBook';
import Button from '../../components/button/Button';
import Carousel from '../../components/carousel/BookCarousel';

const Books: React.FC = () => {
  const { allBooks } = useBooks();

  return (
    <section className="w-[100%] h-[auto] pb-16 px-12" id="book_section">
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
        <div className="flex gap-10 flex-wrap justify-start mt-4">
          {allBooks.map((book) => (
            <CardBook key={book.id} book={book} />
          ))}
        </div>
        <h3 className="text-3xl mt-12">Todos nuestros libros</h3>
        <div className="w-[300px] h-[1px] bg-slate-400 my-2"></div>
        <div className="flex gap-10 flex-wrap justify-start mt-4">
          <Carousel books={allBooks} />
        </div>
      </div>
    </section>
  );
};

export default Books;
