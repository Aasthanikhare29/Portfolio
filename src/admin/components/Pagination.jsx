import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="admin-pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous page">
        <ChevronLeft size={14} />
      </button>
      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} style={{ padding: "0.375rem 0.5rem", color: "var(--admin-text-secondary)", fontSize: "0.8125rem" }}>...</span>
        ) : (
          <button key={page} className={currentPage === page ? "active" : ""} onClick={() => onPageChange(page)}>
            {page}
          </button>
        )
      )}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} aria-label="Next page">
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
