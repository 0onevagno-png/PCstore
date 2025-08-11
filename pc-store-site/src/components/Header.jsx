import React from "react";
import { FaShoppingCart, FaUser, FaChevronDown, FaTools } from "react-icons/fa";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [isGamingHovered, setIsGamingHovered] = React.useState(false);
  const [isClientsHovered, setIsClientsHovered] = React.useState(false);

  const { cartItems } = useCart();
  const handleUserClick = () => {
    if (user) {
      window.location.href = "/profile";
    } else {
      setShowSignIn(true);
    }
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="relative z-50 flex justify-between items-center px-8 py-3 bg-black border-b border-gray-700">
      <a href="/" className="flex items-center text-2xl font-bold gap-2">
        <img src="/assets/Logo.svg" alt="PC Store Logo" />
        <span className="text-primary-gradient">PC STORE</span>
      </a>

      {/* Навигация */}
      <nav className="space-x-12 text-lg flex items-center">
        {/* Игровые ПК */}
        <div
          className="relative inline-block cursor-pointer select-none"
          onMouseEnter={() => setIsGamingHovered(true)}
          onMouseLeave={() => setIsGamingHovered(false)}>
          <a
            href="/pc/gaming"
            className="nav-link inline-flex items-center gap-1">
            Игровые ПК
            <FaChevronDown
              className={`transition-transform duration-300 ${
                isGamingHovered ? "rotate-180" : ""
              }`}
              size={12}
            />
          </a>
          {isGamingHovered && (
            <div className="dropdown-gold">
              <div className="dropdown-gold-inner">
                <a
                  href="/pc/intel"
                  className="block px-4 py-2 text-white hover:text-yellow-400">
                  Intel
                </a>
                <a
                  href="/pc/amd"
                  className="block px-4 py-2 text-white hover:text-yellow-400">
                  AMD
                </a>
                <a
                  href="/pc/office"
                  className="block px-4 py-2 text-white hover:text-yellow-400">
                  Офисные
                </a>
                <a
                  href="/pc/pro"
                  className="block px-4 py-2 text-white hover:text-yellow-400">
                  Профессиональные
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Клиентам */}
        <div className="relative inline-block group cursor-pointer select-none">
          <span
            className="nav-link inline-flex items-center gap-1"
            onMouseEnter={() => setIsClientsHovered(true)}
            onMouseLeave={() => setIsClientsHovered(false)}>
            Клиентам
            <FaChevronDown
              className={`transition-transform duration-300 ${
                isClientsHovered ? "rotate-180" : ""
              }`}
              size={12}
            />
          </span>
          <div
            className={`dropdown-gold ${isClientsHovered ? "block" : "hidden"}`}
            onMouseEnter={() => setIsClientsHovered(true)}
            onMouseLeave={() => setIsClientsHovered(false)}>
            <div className="dropdown-gold-inner">
              <a
                href="/clients/payment"
                className="block px-4 py-2 text-white hover:text-yellow-400">
                Оплата
              </a>
              <a
                href="/clients/delivery"
                className="block px-4 py-2 text-white hover:text-yellow-400">
                Доставка
              </a>
            </div>
          </div>
        </div>

        <a href="/services" className="nav-link">
          Услуги
        </a>
        <a href="/contacts" className="nav-link">
          Контакты
        </a>
        <a href="/configurator" className="nav-link">
          Конфигуратор ПК
        </a>
      </nav>

      {/* Иконки пользователя и корзины */}
      <div className="flex items-center gap-6 relative">
        {/* Корзина с количеством */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-xl cursor-pointer text-white hover:text-yellow-400 transition" />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {totalQuantity}
            </span>
          )}
        </Link>

        {/* Админка */}
        {user?.is_admin === "1" || user?.is_admin === 1 ? (
          <Link to="/admin">
            <FaTools className="text-xl cursor-pointer text-white hover:text-yellow-400 transition" />
          </Link>
        ) : null}

        {/* Пользователь */}
        <FaUser
          className="text-xl cursor-pointer text-white hover:text-yellow-400 transition"
          onClick={handleUserClick}
        />
      </div>

      {/* Модальные окна */}
      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onSwitch={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
          onSuccess={(userData) => {
            setUser(userData);
            setShowSignIn(false);
          }}
        />
      )}
      {showSignUp && (
        <SignUp
          onClose={() => setShowSignUp(false)}
          onSwitch={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
          onSuccess={(userData) => {
            setUser(userData);
            setShowSignUp(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
