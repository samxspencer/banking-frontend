import type { Account } from "../types/Account";

interface Props {
  isOpen: boolean;
  account: Account | null;
  actionType: "deposit" | "withdraw" | null;
  amount: string;
  loading: boolean;
  onAmountChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function TransactionModal({
  isOpen,
  account,
  actionType,
  amount,
  loading,
  onAmountChange,
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen || !account || !actionType) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 p-8 rounded-2xl w-96 border border-slate-800 shadow-2xl">
        <h3 className="text-xl font-semibold mb-2 capitalize">
          {actionType} Funds
        </h3>

        <p className="text-sm text-slate-400 mb-6">
          {account.name} • {account.currency}
        </p>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}