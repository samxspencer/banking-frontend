export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-8 text-center text-slate-400 text-sm">
        <p>
          © {new Date().getFullYear()} BankingCore. All rights reserved.
        </p>
        <p className="mt-2 text-slate-500">
          Secure • Reliable • Modern Banking
        </p>
      </div>
    </footer>
  );
}