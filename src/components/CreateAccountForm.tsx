interface Props {
  name: string;
  currency: string;
  onNameChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onCreate: () => void;
}

export default function CreateAccountForm({
  name,
  currency,
  onNameChange,
  onCurrencyChange,
  onCreate,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-400">
        Create New Account
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Account Holder Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
        >
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
        </select>

        <button
          onClick={onCreate}
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-medium transition"
        >
          Create
        </button>
      </div>
    </div>
  );
}