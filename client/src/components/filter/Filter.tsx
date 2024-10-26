import { ImPriceTag } from 'react-icons/im';
import { appConfig } from '../../config/ApplicationConfig';
import { useCategory } from '../../hooks/useCategory';
import React from 'react';

const Filter = () => {
  const { categories } = useCategory();

  return (
    <div className="flex flex-col md:sticky top-0 justify-between items-start sm:w-full md:w-[25%] sm:flex-col md:flex-col gap-[30px] pt-4 bg-white">
      <div className="flex flex-col gap-2">
        <h5 className="text-sm uppercase font-bold">Filtrar por editorial</h5>
        <select
          name="filter_by"
          id="filter_by"
          className="w-[340px] h-[40px] shadow p-2"
          defaultValue="null"
        >
          <option value="null" disabled>
            Seleccione una editorial
          </option>
          <option value="popular">Ordenar por popularidad</option>
          <option value="price">Ordenar por precio</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-sm uppercase font-bold">Filtrar por precio</h5>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input type="text" className="w-[150px] h-[40px] shadow pl-5" />
            <ImPriceTag
              size={20}
              className="absolute top-1/2 right-2 -translate-y-1/2"
            />
            <span
              className="absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none"
              title={appConfig.CURRENCY_TITLE}
            >
              {appConfig.CURRENCY_SYMBOL}
            </span>
          </div>
          <div className="w-[20px] h-[1px] bg-gray-300"></div>
          <div className="relative">
            <input type="text" className="w-[150px] h-[40px] shadow pl-5" />
            <ImPriceTag
              size={20}
              className="absolute top-1/2 right-2 -translate-y-1/2"
            />
            <span
              className="absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none"
              title={appConfig.CURRENCY_TITLE}
            >
              {appConfig.CURRENCY_SYMBOL}
            </span>
          </div>
        </div>
        <h6 className="text-[11px]">
          *Min. {appConfig.CURRENCY_SYMBOL} $900.00 - Max{' '}
          {appConfig.CURRENCY_SYMBOL} $100,000.00
        </h6>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h5 className="text-sm uppercase font-bold">Etiquetas</h5>
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="filter_by"
                id={`filter_by_${category.id}`} // Cambia el `id` también para que sea único
                value={category.id}
              />
              <label htmlFor={`filter_by_${category.id}`} className="text-md text-blue-700">
                {category.name}
              </label>
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Filter;
