import type { Account } from "../types/Account";

interface Props {
  isOpen: boolean;
  accounts: Account[];
  fromAccount: Account | null;
  amount: string;
  loading: boolean;
  onClose: () => void;
  onAmountChange: (value: string) => void;
  onConfirm: (toAccountNumber: number) => void;
}

export default function TransferModal({
  isOpen,
  accounts,
  fromAccount,
  amount,
  loading,
  onClose,
  onAmountChange,
  onConfirm,
}: Props) {
  if (!isOpen || !fromAccount) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 p-8 rounded-2xl w-96 border border-slate-800 shadow-2xl">
        <h3 className="text-xl font-semibold mb-4">
          Transfer from {fromAccount.accountName}
        </h3>

        <select
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4"
          onChange={(e) => {
            const toAccountNumber = Number(e.target.value);
            if (toAccountNumber) {
              onConfirm(toAccountNumber);
            }
          }}
        >
          <option value="">Select destination account</option>
          {accounts
            .filter(
              (acc) => acc.accountNumber !== fromAccount.accountNumber
            )
            .map((acc) => (
              <option key={acc.accountNumber} value={acc.accountNumber}>
                {acc.accountName} ({acc.currency})
              </option>
            ))}
        </select>

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