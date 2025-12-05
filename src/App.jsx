import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AppRouter from "./router.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
        <Navbar />
        <main className="flex-1 pt-20 pb-12">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
