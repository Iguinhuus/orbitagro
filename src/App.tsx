import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notificacao from "./components/Notificacao";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Notificacao />
          <div className="flex-1">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
