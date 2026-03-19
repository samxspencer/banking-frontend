import { useState, useEffect } from "react";
import type { Account } from "../types/Account";

interface Props {
  isOpen: boolean;
  accounts: Account[];
  fromAccount: Account | null;
  amount: string;
  loading: boolean;
  onClose: () => void;
  onAmountChange: (value: string) => void;
  onConfirm: (toAccountNumber: string) => void;
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
  const [selectedToAccount, setSelectedToAccount] = useState<string | null>(null);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedToAccount(null);
    }
  }, [isOpen]);

  if (!isOpen || !fromAccount) return null;

  const availableAccounts = accounts.filter(
    (acc) => acc.accountNumber !== fromAccount.accountNumber
  );

  const handleConfirm = () => {
    if (!selectedToAccount) return;
    onConfirm(selectedToAccount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Transfer Funds
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* From Account */}
        <div className="mb-4">
          <p className="text-sm text-slate-400">From</p>
          <p className="font-medium">
            {fromAccount.accountName} (#
            {fromAccount.accountNumber})
          </p>
        </div>

        {/* To Account */}
        <div className="mb-4">
          <label className="block text-sm text-slate-400 mb-1">
            To Account
          </label>
          <select
            value={selectedToAccount ?? ""}
            onChange={(e) =>
              setSelectedToAccount(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
          >
            <option value="">Select account</option>
            {availableAccounts.map((acc) => (
              <option
                key={acc.accountNumber}
                value={acc.accountNumber}
              >
                {acc.accountName} (#
                {acc.accountNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-sm text-slate-400 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg transition"
          >
            Cancel
          </button>

          <button
            disabled={
              loading || !selectedToAccount || !amount
            }
            onClick={handleConfirm}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg transition disabled:opacity-40"
          >
            {loading ? "Processing..." : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
}