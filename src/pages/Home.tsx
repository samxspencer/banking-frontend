import { useEffect, useState } from "react";
import type { Account } from "../types/Account";
import type { Transaction } from "../types/Transaction";

import AccountCard from "../components/AccountCard";
import CreateAccountForm from "../components/CreateAccountForm";
import TransactionModal from "../components/TransactionModal";
import TransferModal from "../components/TransferModal";
import TransactionPanel from "../components/TransactionPanel";

import {
  fetchAccounts,
  createAccount as createAccountApi,
  transact,
  transfer,
  getTransactions,
} from "../services/accountService";

export default function Home() {
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
  const [selectedAccount, setSelectedAccount] =
    useState<Account | null>(null);
  const [actionType, setActionType] =
    useState<"deposit" | "withdraw" | null>(null);
  const [amount, setAmount] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  // ===============================
  // Transfer Modal State
  // ===============================
  const [transferOpen, setTransferOpen] = useState(false);
  const [transferFrom, setTransferFrom] =
    useState<Account | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferLoading, setTransferLoading] =
    useState(false);

  // ===============================
  // Transaction History State
  // ===============================
  const [transactionPanelOpen, setTransactionPanelOpen] =
    useState(false);
  const [selectedTransactions, setSelectedTransactions] =
    useState<Transaction[]>([]);
  const [selectedAccountForHistory, setSelectedAccountForHistory] =
    useState<Account | null>(null);
  const [transactionPage, setTransactionPage] =
    useState(0);
  const [transactionTotalPages, setTransactionTotalPages] =
    useState(0);

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
  const openModal = (
    account: Account,
    type: "deposit" | "withdraw"
  ) => {
    setSelectedAccount(account);
    setActionType(type);
    setModalOpen(true);
  };

  const handleTransaction = async () => {
    if (!selectedAccount || !actionType || !amount)
      return;

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

  const handleTransfer = async (
    toAccountNumber: string
  ) => {
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
    const data = await getTransactions(
      account.accountNumber,
      page
    );

    setSelectedTransactions(data.transactions);
    setTransactionTotalPages(data.totalPages);
    setTransactionPage(page);
    setSelectedAccountForHistory(account);
    setTransactionPanelOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">


    {/* Hero Image Section */}
    <section className="relative h-[75vh] w-full overflow-hidden rounded-2xl mb-24">

      {/* Background Image */}
      <img
        src="https://www.bochk.com/dam/more/pwealth/images/contactus/banner.jpg"
        alt="Financial Hub"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/40"></div>

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col justify-center px-16 text-cream">
        <h1 className="text-6xl font-semibold leading-tight tracking-tight max-w-3xl">
          Private Wealth.
          <br />
          Structured With Precision.
        </h1>

        <p className="mt-8 text-lg tracking-wide max-w-xl text-cream/80">
          A refined full‑stack banking architecture built for disciplined capital management and institutional clarity.
        </p>
      </div>
    </section>

      {/* CREATE ACCOUNT */}
      <div className="mb-16">
        <CreateAccountForm
          name={name}
          currency={currency}
          onNameChange={setName}
          onCurrencyChange={setCurrency}
          onSubmit={handleCreateAccount}
        />
      </div>

      {/* ACCOUNTS */}
      <h2 className="text-3xl font-bold mb-8">
        Accounts
      </h2>

      {accounts.length === 0 ? (
        <p>No accounts created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.map((acc) => (
            <AccountCard
              key={acc.accountNumber}
              account={acc}
              onDeposit={() =>
                openModal(acc, "deposit")
              }
              onWithdraw={() =>
                openModal(acc, "withdraw")
              }
              onTransfer={() =>
                openTransfer(acc)
              }
              onViewTransactions={() =>
                viewTransactions(acc)
              }
            />
          ))}
        </div>
      )}

      {/* MODALS */}
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

      <TransferModal
        isOpen={transferOpen}
        accounts={accounts}
        fromAccount={transferFrom}
        amount={transferAmount}
        loading={transferLoading}
        onClose={() => setTransferOpen(false)}
        onAmountChange={setTransferAmount}
        onConfirm={handleTransfer}
      />

      {transactionPanelOpen &&
        selectedAccountForHistory && (
          <TransactionPanel
            transactions={selectedTransactions}
            accountName={
              selectedAccountForHistory.accountName
            }
            currentPage={transactionPage}
            totalPages={transactionTotalPages}
            onPageChange={(page) =>
              viewTransactions(
                selectedAccountForHistory,
                page
              )
            }
            onClose={() =>
              setTransactionPanelOpen(false)
            }
          />
        )}
    </div>
  );
}