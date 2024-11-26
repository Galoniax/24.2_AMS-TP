import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IBook } from '../../interfaces/book.interface';
import { fetchBookById } from '../../services/bookService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { appConfig } from '../../config/ApplicationConfig';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../../components/button/Button';
import { FaCartPlus } from 'react-icons/fa';
import { useBooks } from '../../hooks/useBooks';
import Carousel from '../../components/carousel/BookCarousel';

const BookDetail = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<IBook | null>(null);
  const { allBooks } = useBooks();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const data = await fetchBookById(Number(id));
        setBook(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const getStockOptions = (stock: number) => {
    const maxOptions = Math.min(stock, 25);
    return Array.from({ length: maxOptions }, (_, i) => i + 1);
  };

  if (!book) {
    return (
      <section className="w-[100%] h-[auto] pb-16 px-12 my-5">
        <Breadcrumb />
        <h1 className="text-3xl font-semibold border-b border-gray-300">
          {loading ? 'Cargando...' : 'Libro no encontrado'}
        </h1>
      </section>
    );
  }

  return (
    <section className="w-[100%] h-[auto] pb-16 px-12 my-5">
      <Breadcrumb />
      <div className="w-full flex items-start justify-start my-8 gap-5">
        {/* Left Content */}
        <div
          className="w-[75%] flex gap-10 items-start justify-center flex-wrap"
          aria-label="Detalles del libro"
          tabIndex={-1}
        >
          <div className="flex gap-5">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-[300px] h-[400px] object-contain border"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold border-b border-gray-300">
                {book.title}
              </h1>
              <p className="mt-2">Author: {book.author}</p>
              <p className="mt-2">Género: Terror</p>
              <p className="mt-2 max-w-[650px]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Adipisci voluptate nam illum? Consequatur, architecto quas.
                Voluptatem maxime nobis deserunt molestiae iste eaque
                perferendis saepe aut vitae voluptas nostrum aliquam error
                dolorem quasi, unde quod alias vero! Ipsum delectus tenetur sit,
                aliquam quas sapiente explicabo voluptate veniam facere
                distinctio vero natus.
              </p>
            </div>
          </div>
          {allBooks && allBooks.items.length > 0 && (
            <div className="w-full my-10">
              <h3 className="my-2 uppercase text-xl font-bold">
                Podría interesarte...
              </h3>
              <Carousel books={allBooks?.items} slidesPerView={4} />
            </div>
          )}
        </div>
        {/* Rigth Content */}
        <div className="w-[25%] border px-5 py-10 sticky top-2">
          <div className="header flex flex-col items-start justify-start border-b border-gray-300 py-3">
            {book.isOffer && <h3>10% OFF por membresía</h3>}
            {book.isOffer ? (
              <React.Fragment>
                <div className="w-full flex items-center justify-between">
                  <p className="line-through text-2xl font-bold">
                    {appConfig.CURRENCY_SYMBOL} {formatPrice(book.price || 0)}
                  </p>
                  <p className="text-2xl font-bold">
                    {appConfig.CURRENCY_SYMBOL}{' '}
                    {formatPrice(
                      book.price ? book.price - book?.price * 0.1 : 0,
                    )}
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <p className="text-2xl font-bold">
                {appConfig.CURRENCY_SYMBOL} {formatPrice(book.price || 0)}
              </p>
            )}
          </div>
          <div className="w-full text-center mt-4">
            <h3 className="text-xl font-bold border-b border-gray-300 py-2">
              {book.title}
            </h3>
          </div>
          <div className="my-4 flex items-start justify-start gap-8">
            <div>
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-[130px] h-[180px] object-contain"
              />
            </div>
            <div className="w-[200px] flex flex-col gap-2">
              <p>Stock: {book.stock}</p>
              {book.stock && book.stock > 0 ? (
                <p className="text-green-500">Disponible</p>
              ) : (
                <p className="text-red-500">No disponible</p>
              )}
              <p>
                Se aceptan devoluciones antes de los primeros 60 días de la
                compra.
              </p>
              <select
                name="quantity"
                id="quantity"
                disabled={book.stock === 0}
                className="w-full mt-2 border p-1 text-sm"
              >
                {book.stock && book.stock > 0 && (
                  <option selected disabled>
                    Selecciona una cantidad
                  </option>
                )}
                {book.stock && book.stock > 0 ? (
                  getStockOptions(book.stock).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                ) : (
                  <option>No hay stock</option>
                )}
              </select>
            </div>
          </div>
          <Button
            icon={<FaCartPlus />}
            text="Agregar al carrito"
            type="button"
            className="mt-10"
            disabled={book.stock === 0}
            extraArgs={[
              'w-full',
              'text-white',
              'flex',
              'items-center',
              'justify-center',
              'bg-yellow-500',
              'rounded',
              'mt-4',
              'py-3',
              'px-4',
              'text-md',
              'font-semibold',
            ]}
          />
          <Button
            icon={<FaCartPlus />}
            text="Comprar ahora"
            type="button"
            disabled={book.stock === 0}
            extraArgs={[
              'w-full',
              'text-white',
              'flex',
              'items-center',
              'justify-center',
              'bg-orange-500',
              'rounded',
              'mt-4',
              'py-3',
              'px-4',
              'text-md',
              'font-semibold',
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default BookDetail;
