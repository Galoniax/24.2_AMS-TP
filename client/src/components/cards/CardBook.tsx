import { BiCartAdd } from 'react-icons/bi';
import { appConfig } from '../../config/ApplicationConfig';
import { IBook } from '../../interfaces/book.interface';
import Button from '../button/Button';
import { formatPrice } from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

interface CardBookProps {
  book: IBook;
}

const CardBook: React.FC<CardBookProps> = ({ book }) => {
  const navigate = useNavigate();

  const addToCart = (book: IBook) => {
    console.log(book);
  };

  const handleImageClick = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="border p-4 rounded-[12px] shadow-lg w-[220px] h-[440px] flex flex-col items-center justify-between">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-[100%] h-[320px] object-contain cursor-pointer"
        onClick={handleImageClick}
      />
      <h3 className="text-sm text-center font-light">{book.title}</h3>
      <div className="w-full h-[1px] bg-gray-200 my-2"></div>
      <div className="w-full flex items-center justify-between">
        <p title={appConfig.CURRENCY_TITLE} className="font-bold">
          <span>{appConfig.CURRENCY_SYMBOL}</span>
          &nbsp;{formatPrice(book.price)}
        </p>
        <Button
          text="Añadir"
          type="button"
          size="sm"
          onClick={() => addToCart(book)}
          key={book.id}
          extraArgs={['text-[14px] flex items-center']}
          icon={<BiCartAdd />}
          iconPosition="right"
          iconClassName="text-[20px]"
        ></Button>
      </div>
    </div>
  );
};

export default CardBook;
