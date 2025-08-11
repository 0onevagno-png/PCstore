import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import IntelPC from "./pages/IntelPC";
import AMDPC from "./pages/AMDPC";
import OfficePC from "./pages/OfficePC";
import GamingPC from "./pages/GamingPC";
import Payment from "./pages/Payment";
import Delivery from "./pages/Delivery";
import PCDetails from "./pages/PCDetails";
import ProPC from "./pages/ProPC";
import Contacts from "./pages/Contacts";
import Services from "./pages/Services";
import Configurator from "./pages/Configurator";
import { CartProvider } from "./components/CartContext";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <CartProvider>
      <Router>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route path="/pc/intel" element={<IntelPC />} />
          <Route path="/pc/amd" element={<AMDPC />} />
          <Route path="/pc/office" element={<OfficePC />} />
          <Route path="/pc/gaming" element={<GamingPC />} />
          <Route path="/clients/payment" element={<Payment />} />
          <Route path="/clients/delivery" element={<Delivery />} />
          <Route path="/pc/:category/:id" element={<PCDetails />} />
          <Route path="/pc/:id" element={<ProPC />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/services" element={<Services />} />
          <Route path="/configurator" element={<Configurator />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/admin/amd" element={<AdminPanel category="amd" />} />
          <Route
            path="/admin/intel"
            element={<AdminPanel category="intel" />}
          />
          <Route
            path="/admin/office"
            element={<AdminPanel category="office" />}
          />
          <Route path="/admin/pro" element={<AdminPanel category="pro" />} />
          <Route
            path="/admin/dashboard"
            element={<AdminPanel category="amd" />}
          />
          <Route
            path="/admin/*"
            element={
              user?.is_admin === "1" || user?.is_admin === 1 ? (
                <AdminPanel category="amd" />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin-login"
            element={<AdminLogin setUser={setUser} />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
