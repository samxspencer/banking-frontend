import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAccountById } from "../services/accountService";
import type { Account } from "../types/Account";

export default function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (id) {
      fetchAccountById(id).then(setAccount);
    }
  }, [id]);

  if (!account) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center text-brown tracking-widest">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-32 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Page Title */}
        <h1 className="text-3xl font-semibold tracking-wide text-brown mb-12">
          Account Overview
        </h1>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-brown/10 rounded-xl p-12 shadow-sm space-y-8">

          <div>
            <p className="text-sm tracking-widest text-brown/60 mb-2">
              Balance
            </p>
            <p className="text-2xl font-semibold text-brown">
              {account.balance}
            </p>
          </div>

          <div>
            <p className="text-sm tracking-widest text-brown/60 mb-2">
              Currency
            </p>
            <p className="text-lg text-brown">
              {account.currency}
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => navigate(`/account/${id}/edit`)}
              className="bg-burgundy text-cream px-10 py-3 rounded-md tracking-widest text-sm hover:opacity-90 transition"
            >
              Edit Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}