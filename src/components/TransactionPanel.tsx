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
    <div className="fixed right-0 top-24 h-[calc(100%-6rem)] w-96 bg-cream border-l border-brown/10 shadow-xl p-8 overflow-y-auto z-40">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold text-brown tracking-wide">
          {accountName} — History
        </h2>
        <button
          onClick={onClose}
          className="text-brown/50 hover:text-brown transition text-lg"
        >
          ✕
        </button>
      </div>

      {/* Empty State */}
      {transactions.length === 0 && (
        <p className="text-brown/60 text-sm">
          No transactions recorded.
        </p>
      )}

      {/* Transactions */}
      <div className="space-y-6">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-white border border-brown/10 p-5 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-brown">
                {tx.type}
              </span>

              <span
                className={`font-semibold ${
                  tx.type === "DEPOSIT"
                    ? "text-burgundy"
                    : tx.type === "WITHDRAW"
                    ? "text-brown"
                    : "text-brown"
                }`}
              >
                {tx.amount}
              </span>
            </div>

            <div className="text-xs text-brown/50 mt-2">
              {new Date(tx.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-10">

          <button
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 border border-brown/20 rounded-md text-brown hover:bg-brown/5 transition disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-brown/60">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            disabled={currentPage + 1 >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 border border-brown/20 rounded-md text-brown hover:bg-brown/5 transition disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
}