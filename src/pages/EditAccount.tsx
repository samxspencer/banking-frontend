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
      <div className="min-h-screen bg-cream flex items-center justify-center text-brown tracking-widest">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-32 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Page Title */}
        <h1 className="text-3xl font-semibold tracking-wide text-brown mb-12">
          Edit Account
        </h1>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-brown/10 rounded-xl p-12 shadow-sm space-y-8">

          {/* Account Number */}
          <div>
            <label className="block text-sm tracking-widest text-brown/60 mb-3">
              Account Number
            </label>
            <input
              value={account.accountNumber}
              disabled
              className="w-full border border-brown/20 bg-transparent p-4 rounded-md text-brown/60 cursor-not-allowed"
            />
          </div>

          {/* Account Name */}
          <div>
            <label className="block text-sm tracking-widest text-brown/60 mb-3">
              Account Name
            </label>
            <input
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border border-brown/20 bg-transparent p-4 rounded-md text-brown focus:outline-none focus:border-burgundy transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6">

            <button
              onClick={() => navigate(-1)}
              className="text-sm tracking-widest text-brown/70 hover:text-burgundy transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-burgundy text-cream px-10 py-3 rounded-md tracking-widest text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}