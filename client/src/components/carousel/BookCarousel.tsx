import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IBook } from '../../interfaces/book.interface';
import { Navigation, Pagination } from 'swiper/modules';
import CardBook from '../cards/CardBook';

interface CarouselProps {
  books: IBook[];
  slidesPerView?: number;
}

const Carousel: React.FC<CarouselProps> = ({ books, slidesPerView }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      loop={true}
      pagination={{ clickable: true }}
      spaceBetween={0}
      className="pb-14 px-10"
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: slidesPerView ?? 6,
          spaceBetween: 20,
        },
      }}
    >
      {books.map((book) => (
        <SwiperSlide key={book.id} className="flex items-start justify-center">
          <CardBook book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
