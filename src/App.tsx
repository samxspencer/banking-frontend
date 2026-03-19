import { useEffect, useState } from "react";
import type { Account } from "./types/Account";
import type { Transaction } from "./types/Transaction";

import AccountCard from "./components/AccountCard";
import CreateAccountForm from "./components/CreateAccountForm";
import TransactionModal from "./components/TransactionModal";
import TransferModal from "./components/TransferModal";


import {
  fetchAccounts,
  createAccount as createAccountApi,
  transact,
  transfer,
  getTransactions,
} from "./services/accountService";
import TransactionPanel from "./components/TransactionPanel";

export default function App() {
  // ===============================
  // Account State
  // ===============================
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("USD");

  // ===============================
  // Deposit / Withdraw Modal State
  // ===============================
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [actionType, setActionType] = useState<"deposit" | "withdraw" | null>(
    null
  );
  const [amount, setAmount] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  // ===============================
  // Transfer Modal State
  // ===============================
  const [transferOpen, setTransferOpen] = useState(false);
  const [transferFrom, setTransferFrom] = useState<Account | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);

  // ===============================
  // Transaction History State
  // ===============================
  const [transactionPanelOpen, setTransactionPanelOpen] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<
    Transaction[]
  >([]);
  const [selectedAccountForHistory, setSelectedAccountForHistory] =
    useState<Account | null>(null);
  const [transactionPage, setTransactionPage] = useState(0);
  const [transactionTotalPages, setTransactionTotalPages] = useState(0);

  // ===============================
  // Initial Load
  // ===============================
  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const data = await fetchAccounts();
    setAccounts(data);
  };

  // ===============================
  // Create Account
  // ===============================
  const handleCreateAccount = async () => {
    if (!name) return;

    await createAccountApi(name, currency);
    setName("");
    await loadAccounts();
  };

  // ===============================
  // Deposit / Withdraw
  // ===============================
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

  // ===============================
  // Transfer
  // ===============================
  const openTransfer = (account: Account) => {
    setTransferFrom(account);
    setTransferOpen(true);
  };

const handleTransfer = async (toAccountNumber: string) => {
  if (!transferFrom || !transferAmount) return;

  setTransferLoading(true);

  await transfer(
    transferFrom.accountNumber,
    toAccountNumber,
    Number(transferAmount)
  );

  setTransferLoading(false);
  setTransferOpen(false);
  setTransferAmount("");
  await loadAccounts();
};

  // ===============================
  // Transaction History
  // ===============================
  const viewTransactions = async (
    account: Account,
    page: number = 0
  ) => {
    const data = await getTransactions(account.accountNumber, page);

    setSelectedTransactions(data.transactions);
    setTransactionTotalPages(data.totalPages);
    setTransactionPage(page);
    setSelectedAccountForHistory(account);
    setTransactionPanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">
          Banking<span className="text-indigo-500">Core</span>
        </h1>
        <p className="text-slate-400">Full-Stack Banking System</p>
      </header>

      {/* ================= CREATE ACCOUNT ================= */}
      <CreateAccountForm
        name={name}
        currency={currency}
        onNameChange={setName}
        onCurrencyChange={setCurrency}
        onCreate={handleCreateAccount}
      />

      {/* ================= ACCOUNTS ================= */}
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
              onViewTransactions={(account) =>
                viewTransactions(account)
              }
            />
          ))}
        </div>
      )}

      {/* ================= TRANSACTION MODAL ================= */}
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

      {/* ================= TRANSFER MODAL ================= */}
      <TransferModal
          isOpen={transferOpen}
          accounts={accounts}
          fromAccount={transferFrom}
          amount={transferAmount}
          loading={transferLoading}
          onClose={() => setTransferOpen(false)}
          onAmountChange={setTransferAmount}
          onConfirm={(toAccountNumber) =>
            handleTransfer(toAccountNumber)
          }
        />

      {/* ================= TRANSACTION PANEL ================= */}
      {transactionPanelOpen && selectedAccountForHistory && (
        <TransactionPanel
          transactions={selectedTransactions}
          accountName={
            selectedAccountForHistory.accountName
          }
          currentPage={transactionPage}
          totalPages={transactionTotalPages}
          onPageChange={(page) =>
            viewTransactions(selectedAccountForHistory, page)
          }
          onClose={() => setTransactionPanelOpen(false)}
        />
      )}
    </div>
  );
}