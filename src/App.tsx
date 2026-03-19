import { useEffect, useState } from "react";
import type { Account } from "./types/Account";
import AccountCard from "./components/AccountCard";
import CreateAccountForm from "./components/CreateAccountForm";
import TransactionModal from "./components/TransactionModal";
import TransferModal from "./components/TransferModal";
import { transfer } from "./services/accountService";

import {
  fetchAccounts,
  createAccount as createAccountApi,
  transact,
} from "./services/accountService";

export default function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("USD");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [actionType, setActionType] = useState<"deposit" | "withdraw" | null>(null);
  const [amount, setAmount] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [transferFrom, setTransferFrom] = useState<Account | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferTo, setTransferTo] = useState<number | null>(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const data = await fetchAccounts();
    setAccounts(data);
  };

  const handleCreateAccount = async () => {
    if (!name) return;

    await createAccountApi(name, currency);
    setName("");
    await loadAccounts();
  };

  const openModal = (account: Account, type: "deposit" | "withdraw") => {
    setSelectedAccount(account);
    setActionType(type);
    setModalOpen(true);
  };

  const handleTransaction = async () => {
    if (!selectedAccount || !actionType || !amount) return;

    setLoadingAction(true);

    await transact(
      selectedAccount.accountNumber,
      actionType,
      Number(amount)
    );

    setLoadingAction(false);
    setModalOpen(false);
    setAmount("");
    await loadAccounts();
  };

  const openTransfer = (account: Account) => {
    setTransferFrom(account);
    setTransferOpen(true);
  };

  const handleTransfer = async () => {
    if (!transferFrom || !transferTo || !transferAmount) return;

    setTransferLoading(true);

    await transfer(
      transferFrom.accountNumber,
      transferTo,
      Number(transferAmount)
    );

    setTransferLoading(false);
    setTransferOpen(false);
    setTransferAmount("");
    setTransferTo(null);
    await loadAccounts();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">
          Banking<span className="text-indigo-500">Core</span>
        </h1>
        <p className="text-slate-400">Full-Stack Banking System</p>
      </header>

      {/* Create Account */}
      <CreateAccountForm
        name={name}
        currency={currency}
        onNameChange={setName}
        onCurrencyChange={setCurrency}
        onCreate={handleCreateAccount}
      />

      {/* Accounts */}
      <h2 className="text-2xl font-semibold mb-6">Accounts</h2>

      {accounts.length === 0 ? (
        <p className="text-slate-400">No accounts created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => (
            <AccountCard
              key={acc.accountNumber}
              account={acc}
              onDeposit={(account) => openModal(account, "deposit")}
              onWithdraw={(account) => openModal(account, "withdraw")}
              onTransfer={(account) => openTransfer(account)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <TransactionModal
        isOpen={modalOpen}
        account={selectedAccount}
        actionType={actionType}
        amount={amount}
        loading={loadingAction}
        onAmountChange={setAmount}
        onClose={() => setModalOpen(false)}
        onConfirm={handleTransaction}
      />

      {/* Transfer Modal */}
      <TransferModal
        isOpen={transferOpen}
        accounts={accounts}
        fromAccount={transferFrom}
        amount={transferAmount}
        loading={transferLoading}
        onClose={() => setTransferOpen(false)}
        onAmountChange={setTransferAmount}
        onConfirm={(toAccountNumber) => {
          setTransferTo(toAccountNumber);
          handleTransfer();
        }}
      />
    </div>
  );
}