import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Book } from '../../interfaces/book.interface';
import { Navigation, Pagination } from 'swiper/modules';
import CardBook from '../cards/CardBook';

interface CarouselProps {
  books: Book[];
}

const Carousel: React.FC<CarouselProps> = ({ books }) => {
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
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <CardBook book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
