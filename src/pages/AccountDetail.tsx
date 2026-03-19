import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAccountById } from "../services/accountService";
import type { Account } from "../types/Account";

export default function AccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (id) {
      fetchAccountById(id).then(setAccount);
    }
  }, [id]);

  if (!account) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        {account.accountName}
      </h1>

      <div className="space-y-2">
        <p><strong>Account Number:</strong> {account.accountNumber}</p>
        <p><strong>Balance:</strong> {account.balance}</p>
        <p><strong>Currency:</strong> {account.currency}</p>
      </div>

      <button
        onClick={() => navigate(`/account/${account.accountNumber}/edit`)}
        className="mt-6 bg-indigo-600 px-6 py-2 rounded"
      >
        Edit Account
      </button>
    </div>
  );
}