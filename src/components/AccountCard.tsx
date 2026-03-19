import { useNavigate } from "react-router-dom";
import type { Account } from "../types/Account";

interface Props {
  account: Account;
  onDeposit: () => void;
  onWithdraw: () => void;
  onTransfer: () => void;
  onViewTransactions: () => void;
}

export default function AccountCard({
  account,
  onDeposit,
  onWithdraw,
  onTransfer,
  onViewTransactions,
}: Props) {
  const navigate = useNavigate();

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: account.currency,
    }).format(balance);
  };

  return (
    <div
      onClick={() =>
        navigate(`/account/${account.accountNumber}`)
      }
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg cursor-pointer hover:border-indigo-500 transition"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {account.accountName}
        </h2>
        <span className="text-slate-400 text-sm">
          {account.accountNumber}
        </span>
      </div>

      {/* Balance */}
      <div className="mb-6">
        <p className="text-slate-400 text-sm">Balance</p>
        <p className="text-2xl font-bold text-green-400">
          {formatBalance(account.balance)}
        </p>
      </div>

      {/* Actions */}
      <div
        className="grid grid-cols-2 gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDeposit}
          className="bg-green-600 hover:bg-green-500 py-2 rounded-lg transition"
        >
          Deposit
        </button>

        <button
          onClick={onWithdraw}
          className="bg-red-600 hover:bg-red-500 py-2 rounded-lg transition"
        >
          Withdraw
        </button>

        <button
          onClick={onTransfer}
          className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg transition"
        >
          Transfer
        </button>

        <button
          onClick={onViewTransactions}
          className="bg-slate-700 hover:bg-slate-600 py-2 rounded-lg transition"
        >
          History
        </button>
      </div>
    </div>
  );
}