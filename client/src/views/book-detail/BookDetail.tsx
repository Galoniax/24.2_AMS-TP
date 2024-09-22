import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../../interfaces/book.interface';
import { fetchBookById } from '../../services/bookService';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await fetchBookById(Number(id));
        setBook(data);
      } catch (error) {
        console.error('Error fetching book by ID:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.imageUrl} alt={book.title} />
      <p>Author: {book.author}</p>
      <p>Price: {book.price}</p>
      <p>{book.isOffer ? 'On offer!' : ''}</p>
    </div>
  );
};

export default BookDetail;
