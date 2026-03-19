import type { Transaction } from "../types/Transaction";

interface Props {
  transactions: Transaction[];
  accountName: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClose: () => void;
}

export default function TransactionPanel({
  transactions,
  accountName,
  currentPage,
  totalPages,
  onPageChange,
  onClose,
}: Props) {
  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-slate-900 border-l border-slate-800 shadow-2xl p-6 overflow-y-auto z-40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {accountName} — History
        </h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-lg"
        >
          ✕
        </button>
      </div>

      {transactions.length === 0 && (
        <p className="text-slate-400 text-sm">
          No transactions yet.
        </p>
      )}

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-slate-800 p-4 rounded-xl"
          >
            <div className="flex justify-between">
              <span className="font-medium">
                {tx.type}
              </span>

              <span
                className={`font-semibold ${
                  tx.type === "DEPOSIT"
                    ? "text-emerald-400"
                    : tx.type === "WITHDRAW"
                    ? "text-rose-400"
                    : "text-indigo-400"
                }`}
              >
                {tx.amount}
              </span>
            </div>

            <div className="text-xs text-slate-400 mt-1">
              {new Date(tx.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between mt-6">
          <button
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage - 1)}
            className="bg-slate-700 px-3 py-1 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-slate-400">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            disabled={currentPage + 1 >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="bg-slate-700 px-3 py-1 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}