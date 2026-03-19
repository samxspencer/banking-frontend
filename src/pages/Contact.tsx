export default function Contact() {
  return (
    <div className="min-h-screen bg-cream pt-32 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-semibold tracking-wide text-brown mb-12">
          Contact Us
        </h1>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-brown/10 rounded-xl p-12 shadow-sm">

          <form className="space-y-8">

            {/* Name */}
            <div>
              <label className="block text-sm tracking-widest text-brown/60 mb-3">
                Your Name
              </label>
              <input
                type="text"
                className="w-full border border-brown/20 bg-transparent p-4 rounded-md text-brown focus:outline-none focus:border-burgundy transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm tracking-widest text-brown/60 mb-3">
                Your Email
              </label>
              <input
                type="email"
                className="w-full border border-brown/20 bg-transparent p-4 rounded-md text-brown focus:outline-none focus:border-burgundy transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm tracking-widest text-brown/60 mb-3">
                Your Message
              </label>
              <textarea
                rows={6}
                className="w-full border border-brown/20 bg-transparent p-4 rounded-md text-brown focus:outline-none focus:border-burgundy transition resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-burgundy text-cream px-10 py-3 rounded-md tracking-widest text-sm hover:opacity-90 transition"
              >
                Submit Inquiry
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}