import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import AccountDetail from "./pages/AccountDetail";
import EditAccount from "./pages/EditAccount";
import Footer from "./components/Footer";

export default function App() {
  return (
        <div className="min-h-screen bg-cream text-brown">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account/:id" element={<AccountDetail />} />
        <Route path="/account/:id/edit" element={<EditAccount />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>

  );
}