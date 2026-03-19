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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-6">

      <div className="bg-cream border border-brown/10 rounded-xl p-10 w-full max-w-lg shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold text-brown tracking-wide">
            Transfer Funds
          </h2>
          <button
            onClick={onClose}
            className="text-brown/50 hover:text-brown transition text-lg"
          >
            ✕
          </button>
        </div>

        {/* From Account */}
        <div className="mb-8">
          <p className="text-sm tracking-widest text-brown/60 mb-2">
            From
          </p>
          <p className="text-brown font-medium">
            {fromAccount.accountName} (#{fromAccount.accountNumber})
          </p>
        </div>

        {/* To Account */}
        <div className="mb-8">
          <label className="block text-sm tracking-widest text-brown/60 mb-3">
            To Account
          </label>
          <select
            value={selectedToAccount ?? ""}
            onChange={(e) => setSelectedToAccount(e.target.value)}
            className="w-full border border-brown/20 bg-white p-4 rounded-md text-brown focus:outline-none focus:border-burgundy transition"
          >
            <option value="">Select account</option>
            {availableAccounts.map((acc) => (
              <option
                key={acc.accountNumber}
                value={acc.accountNumber}
              >
                {acc.accountName} (#{acc.accountNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="mb-10">
          <label className="block text-sm tracking-widest text-brown/60 mb-3">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-brown/20 bg-white p-4 rounded-md text-brown focus:outline-none focus:border-burgundy transition"
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
            disabled={loading || !selectedToAccount || !amount}
            onClick={handleConfirm}
            className="flex-1 bg-burgundy text-cream py-3 rounded-md tracking-widest text-sm hover:opacity-90 transition disabled:opacity-40"
          >
            {loading ? "Processing..." : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
}