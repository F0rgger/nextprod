interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
    return (
        <div className="flex justify-center mt-6 space-x-2">
            <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg shadow-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
                ◀ Назад
            </button>
            <span className="px-4 py-2 bg-gray-200 rounded-lg shadow-md">Страница {page} из {totalPages}</span>
            <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg shadow-md ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
                Вперед ▶
            </button>
        </div>
    );
}
