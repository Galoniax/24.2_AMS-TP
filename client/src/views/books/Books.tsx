import React, { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import CardBook from '../../components/cards/CardBook';
import Button from '../../components/button/Button';

const Books: React.FC = () => {
  const [filter, setFilter] = useState({
    isOffer: undefined,
    isNew: undefined,
  });
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const { books } = useBooks(filter);

  const handleFilter = (filterType: 'isOffer' | 'isNew') => {
    setSelectedFilter(filterType === selectedFilter ? null : filterType);
    setFilter((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === undefined ? true : undefined,
    }));
  };

  return (
    <div className="w-[100%] h-[auto] pb-16 px-12">
      <div className="my-4 flex w-full items-center justify-center gap-3">
        <Button
          text="Ofertas"
          onClick={() => handleFilter('isOffer')}
          className="mr-2"
          size="md"
          type="button"
          extraArgs={[
            'rounded-full',
            selectedFilter === 'isOffer' ? 'bg-red-700' : '',
          ]}
        />
        <Button
          text="Nuevos"
          onClick={() => handleFilter('isNew')}
          size="md"
          type="button"
          extraArgs={[
            'rounded-full',
            selectedFilter === 'isNew' ? 'bg-red-700' : '',
          ]}
        />
      </div>
      <div className="flex gap-10 flex-wrap justify-start">
        {books.map((book) => (
          <CardBook key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
