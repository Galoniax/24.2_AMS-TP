import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface PaginationProps {
  children: React.ReactNode;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  isLast: boolean;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  children,
  pageNumber,
  pageSize,
  totalItems,
  totalPages,
  isLast,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      {children}
      <div className="w-full flex gap-2 items-center justify-between mt-4">
        <span>
          Página {pageNumber + 1} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            aria-label="prev"
            title="Anterior"
            disabled={pageNumber === 0}
            onClick={() => onPageChange(pageNumber - 1)}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
          >
            <BsArrowLeft />
          </button>
          <button
            aria-label="next"
            title="Siguiente"
            disabled={isLast}
            onClick={() => onPageChange(pageNumber + 1)}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
