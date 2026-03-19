import type { Account } from "../types/Account";

interface Props {
  account: Account;
  onDeposit: (account: Account) => void;
  onWithdraw: (account: Account) => void;
}

export default function AccountCard({
  account,
  onDeposit,
  onWithdraw,
}: Props) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{account.name}</h3>
        <span className="text-xs bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full">
          {account.currency}
        </span>
      </div>

      <div className="text-sm text-slate-400 mb-2">
        Account #{account.accountNumber}
      </div>

      <div className="text-3xl font-bold text-indigo-400 mb-6">
        {account.balance.toLocaleString()}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onDeposit(account)}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg text-sm font-medium transition"
        >
          Deposit
        </button>

        <button
          onClick={() => onWithdraw(account)}
          className="flex-1 bg-rose-600 hover:bg-rose-500 py-2 rounded-lg text-sm font-medium transition"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}