import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchAccountById,
  updateAccount,
} from "../services/accountService";
import type { Account } from "../types/Account";

export default function EditAccount() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState<Account | null>(null);
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAccountById(id).then((data) => {
        setAccount(data);
        setAccountName(data.accountName);
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (!id) return;

    try {
      setLoading(true);
      await updateAccount(id, accountName);
      navigate(`/account/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update account");
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Account
      </h1>

      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-slate-400 mb-1">
            Account Number
          </label>
          <input
            value={account.accountNumber}
            disabled
            className="w-full bg-slate-800 p-3 rounded text-slate-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">
            Account Name
          </label>
          <input
            value={accountName}
            onChange={(e) =>
              setAccountName(e.target.value)
            }
            className="w-full bg-slate-800 p-3 rounded"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}