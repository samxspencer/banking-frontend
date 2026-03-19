export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <div className="space-y-4">
        <input
          placeholder="Your Email"
          className="w-full max-w-md bg-slate-800 p-3 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="w-full max-w-md bg-slate-800 p-3 rounded"
        />
        <button className="bg-indigo-600 px-6 py-2 rounded">
          Send Message
        </button>
      </div>
    </div>
  );
}