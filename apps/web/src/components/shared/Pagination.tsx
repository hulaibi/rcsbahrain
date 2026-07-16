import Link from "next/link";

interface PaginationLabels {
  previous: string;
  next: string;
  page: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
  labels: PaginationLabels;
}

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
  labels,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`rounded-md border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 ${
          currentPage === 1
            ? "pointer-events-none border-gray-200 text-gray-400"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        {labels.previous}
      </Link>

      {pageNumbers.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`${labels.page} ${page}`}
          className={`rounded-md border px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 ${
            page === currentPage
              ? "border-red-700 bg-red-700 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`rounded-md border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 ${
          currentPage === totalPages
            ? "pointer-events-none border-gray-200 text-gray-400"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        {labels.next}
      </Link>
    </nav>
  );
}
