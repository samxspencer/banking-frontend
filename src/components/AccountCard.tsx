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
      className="
        group
        bg-cream
        text-brown
        rounded-2xl
        p-6
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-1
        border border-transparent
        hover:border-burgundy
        transition-all duration-300
        cursor-pointer
      "
    >
      {/* Burgundy Accent Bar */}
      <div
        className="
          h-1
          w-14
          bg-burgundy
          rounded
          mb-6
          group-hover:w-24
          transition-all duration-300
        "
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {account.accountName}
        </h2>

        <span className="text-xs text-brown/60">
          {account.accountNumber}
        </span>
      </div>

      {/* Balance */}
      <div className="mb-8">
        <p className="text-sm text-brown/60 mb-1">
          Current Balance
        </p>

        <p className="text-3xl font-bold">
          {formatBalance(account.balance)}
        </p>
      </div>

      {/* Buttons */}
      <div
        className="grid grid-cols-2 gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Primary */}
        <button
          onClick={onDeposit}
          className="
            h-11
            rounded-xl
            bg-burgundy
            text-cream
            font-medium
            hover:bg-[#990026]
            transition
          "
        >
          Deposit
        </button>

        {/* Secondary */}
        <button
          onClick={onWithdraw}
          className="
            h-11
            rounded-xl
            bg-brown
            text-cream
            font-medium
            hover:bg-[#120d0c]
            transition
          "
        >
          Withdraw
        </button>

        {/* Tertiary */}
        <button
          onClick={onTransfer}
          className="
            h-11
            rounded-xl
            border border-brown
            text-brown
            hover:bg-brown
            hover:text-cream
            transition
          "
        >
          Transfer
        </button>

        {/* Outline Accent */}
        <button
          onClick={onViewTransactions}
          className="
            h-11
            rounded-xl
            border border-burgundy
            text-brown
            hover:bg-burgundy
            hover:text-cream
            transition
          "
        >
          History
        </button>
      </div>
    </div>
  );
}