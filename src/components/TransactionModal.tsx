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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-6">

      <div className="bg-cream border border-brown/10 p-10 rounded-xl w-full max-w-md shadow-xl">

        {/* Title */}
        <h3 className="text-2xl font-semibold text-brown mb-3 tracking-wide capitalize">
          {actionType} Funds
        </h3>

        {/* Account Info */}
        <p className="text-sm text-brown/60 mb-8">
          {account.accountName} • {account.currency}
        </p>

        {/* Amount */}
        <div className="mb-10">
          <label className="block text-sm tracking-widest text-brown/60 mb-3">
            Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full border border-brown/20 bg-white rounded-md px-4 py-3 text-brown focus:outline-none focus:border-burgundy transition"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-brown/20 py-3 rounded-md text-brown hover:bg-brown/5 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-burgundy text-cream py-3 rounded-md tracking-widest text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>

      </div>
    </div>
  );
}