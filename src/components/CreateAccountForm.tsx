interface Props {
  name: string;
  currency: string;
  onNameChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onSubmit: () => void;
}

export default function CreateAccountForm({
  name,
  currency,
  onNameChange,
  onCurrencyChange,
  onSubmit,
}: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-sm border border-brown/10">
      <h2 className="text-xl tracking-widest font-semibold mb-10 text-brown">
        Open A New Account
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Account Holder Name"
          className="
            flex-1
            rounded-xl
            border border-brown/20
            bg-transparent
            p-4
            outline-none
            focus:border-burgundy
            transition
          "
        />

        {/* Currency Select */}
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="
            rounded-xl
            border border-brown/20
            bg-transparent
            p-4
            outline-none
            focus:border-burgundy
            transition
          "
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          className="
            bg-burgundy
            text-cream
            px-10
            rounded-md
            tracking-widest
            text-sm
            hover:opacity-90
            transition
            "
        >
          Create
        </button>
      </div>
    </div>
  );
}