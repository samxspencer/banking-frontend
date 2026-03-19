import { useEffect, useState } from "react";

interface Account {
  accountNumber: number;
  name: string;
  balance: number;
  currency: string;
}

const API = "http://localhost:8080/accounts";

export default function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [actionType, setActionType] = useState<"deposit" | "withdraw" | null>(null);
  const [amount, setAmount] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setAccounts(data);
  };

  const createAccount = async () => {
    if (!name) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, currency }),
    });

    setName("");
    fetchAccounts();
  };

  const openModal = (account: Account, type: "deposit" | "withdraw") => {
    setSelectedAccount(account);
    setActionType(type);
    setModalOpen(true);
  };

  const handleTransaction = async () => {
    if (!selectedAccount || !actionType || !amount) return;

    setLoadingAction(true);

    await fetch(
      `${API}/${selectedAccount.accountNumber}/${actionType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number(amount) }),
      }
    );

    setLoadingAction(false);
    setModalOpen(false);
    setAmount("");
    fetchAccounts();
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

      {/* Create Account Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-400">
          Create New Account
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Account Holder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>

          <button
            onClick={createAccount}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-medium transition"
          >
            Create
          </button>
        </div>
      </div>

      {/* Accounts */}
      <h2 className="text-2xl font-semibold mb-6">Accounts</h2>

      {accounts.length === 0 ? (
        <p className="text-slate-400">No accounts created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => (
            <div
              key={acc.accountNumber}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">{acc.name}</h3>
                <span className="text-xs bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full">
                  {acc.currency}
                </span>
              </div>

              <div className="text-sm text-slate-400 mb-2">
                Account #{acc.accountNumber}
              </div>

              <div className="text-3xl font-bold text-indigo-400 mb-6">
                {acc.balance.toLocaleString()}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => openModal(acc, "deposit")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg text-sm font-medium transition"
                >
                  Deposit
                </button>

                <button
                  onClick={() => openModal(acc, "withdraw")}
                  className="flex-1 bg-rose-600 hover:bg-rose-500 py-2 rounded-lg text-sm font-medium transition"
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedAccount && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl w-96 border border-slate-800 shadow-2xl">
            <h3 className="text-xl font-semibold mb-2 capitalize">
              {actionType} Funds
            </h3>

            <p className="text-sm text-slate-400 mb-6">
              {selectedAccount.name} • {selectedAccount.currency}
            </p>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                onClick={handleTransaction}
                disabled={loadingAction}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg transition disabled:opacity-50"
              >
                {loadingAction ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}