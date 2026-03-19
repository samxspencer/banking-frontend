import type { Account } from "../types/Account";

interface Props {
  account: Account;
  onDeposit: (account: Account) => void;
  onWithdraw: (account: Account) => void;
  onTransfer: (account: Account) => void;
  onViewTransactions: (account: Account) => void; // ✅ added
}

export default function AccountCard({
  account,
  onDeposit,
  onWithdraw,
  onTransfer,
  onViewTransactions, // ✅ added
}: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800 hover:border-indigo-500 transition">
      {/* Account Name */}
      <h3 className="text-lg font-semibold text-white mb-2">
        {account.accountName}
      </h3>

      {/* Account Number */}
      <p className="text-sm text-slate-400 mb-4">
        #{account.accountNumber}
      </p>

      {/* Balance */}
      <p className="text-2xl font-bold mb-6">
        {account.balance} {account.currency}
      </p>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onDeposit(account)}
          className="bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg text-sm font-medium transition"
        >
          Deposit
        </button>

        <button
          onClick={() => onWithdraw(account)}
          className="bg-rose-600 hover:bg-rose-500 py-2 rounded-lg text-sm font-medium transition"
        >
          Withdraw
        </button>

        <button
          onClick={() => onTransfer(account)}
          className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg text-sm font-medium transition"
        >
          Transfer
        </button>

        <button
          onClick={() => onViewTransactions(account)}
          className="bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm font-medium transition"
        >
          History
        </button>
      </div>
    </div>
  );
}