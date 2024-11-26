import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

interface PaginationProps {
  children: React.ReactNode;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  isLast: boolean;
  onPageChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PaginationComponent = ({
  children,
  pageNumber,
  pageSize,
  totalItems,
  totalPages,
  isLast,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const pageSize = parseInt(event.target.value);
    onPageSizeChange(pageSize);
  };

  return (
    <div
      className="w-full grid min-h-[80dvh] relative"
      style={{ gridTemplateRows: 'auto 1fr auto' }}
    >
      <div className="w-full bg-main flex justify-between items-center px-2 py-4">
        <div className="flex items-center justify-start gap-2">
          <label htmlFor="paginationSize" className="text-white">
            Mostrando
          </label>
          <select
            id="paginationSize"
            className="p-2 border rounded shadow border-gray-400"
            onChange={handlePageSizeChange}
            value={pageSize}
          >
            <option value={10}>10 elementos</option>
            <option value={15}>15 elementos</option>
            <option value={20}>20 elementos</option>
            <option value={50}>50 elementos</option>
            <option value={100}>100 elementos</option>
          </select>
        </div>
        <h3 className="text-white">Total de libros: {totalItems}</h3>
      </div>
      <div className="w-full overflow-auto">{children}</div>
      <div className="w-full flex gap-2 items-center justify-between mt-2 bg-main px-2 py-3">
        <span className="text-white">
          <b>Página</b> {pageNumber + 1} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            aria-label="prev"
            title="Anterior"
            disabled={pageNumber === 0}
            onClick={() => onPageChange(pageNumber - 1)}
            className="p-2 bg-accent text-white rounded-full"
          >
            <MdArrowBackIosNew size={25} />
          </button>
          <button
            aria-label="next"
            title="Siguiente"
            disabled={isLast}
            onClick={() => onPageChange(pageNumber + 1)}
            className="p-2 bg-accent text-white rounded-full"
          >
            <MdArrowForwardIos size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
