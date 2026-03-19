import { useEffect, useState } from "react";

interface Account {
  accountNumber: string;
  name: string;
  currency: string;
  balance: number;
}

const API = "http://localhost:8080/accounts";

export default function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("USD");

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

    await fetch(`${API}?name=${name}&currency=${currency}`, {
      method: "POST",
    });

    setName("");
    fetchAccounts();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold tracking-tight">
          Banking<span className="text-indigo-500">Core</span>
        </h1>
        <div className="text-sm text-slate-400">
          Full‑Stack Banking System
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-10 space-y-10">

        {/* Create Account Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold mb-6 text-indigo-400">
            Create New Account
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Account Holder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>USD</option>
              <option>EUR</option>
              <option>SGD</option>
            </select>

            <button
              onClick={createAccount}
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-indigo-500/30"
            >
              Create
            </button>
          </div>
        </div>

        {/* Accounts Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-slate-300">
            Accounts
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                <div className="text-3xl font-bold text-indigo-400">
                  {acc.balance.toLocaleString()}
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  {acc.currency}
                </div>
              </div>
            ))}
          </div>

          {accounts.length === 0 && (
            <div className="text-slate-500 mt-6">
              No accounts created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}