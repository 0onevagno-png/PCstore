import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; // ← добавили

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate(); // ← инициализация

  const parsePrice = (price) => {
    if (typeof price === "string") {
      return Number(price.replace(/\s/g, "").replace("₽", "")) || 0;
    }
    return price || 0;
  };

  const total = cartItems.reduce((acc, item) => {
    const cleanPrice = parsePrice(item.price);
    const quantity = Number(item.quantity) || 1;
    return acc + cleanPrice * quantity;
  }, 0);

  const formattedTotal = total.toLocaleString("ru-RU") + "₽";

  return (
    <>
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-all duration-300">
          {toastMessage}
        </div>
      )}

      <div className="max-w-6xl mx-auto p-6">
        {/* ← КНОПКА НАЗАД */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
          ← Назад
        </button>

        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          🛒 Ваша корзина
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-gray-400 text-lg">Корзина пуста.</div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center bg-gray-800 rounded-2xl p-4 shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-56 h-56 object-cover rounded-xl mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1 w-full text-white">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>

                    {item.specs && (
                      <ul className="text-sm space-y-1">
                        {item.specs.cpu && (
                          <li>
                            <strong>Процессор:</strong> {item.specs.cpu.name}
                          </li>
                        )}
                        {item.specs.gpu && (
                          <li>
                            <strong>Видеокарта:</strong> {item.specs.gpu.name}
                          </li>
                        )}
                        {item.specs.ram && (
                          <li>
                            <strong>Оперативная память:</strong>{" "}
                            {item.specs.ram.name}
                          </li>
                        )}
                        {item.specs.ssd && (
                          <li>
                            <strong>SSD:</strong> {item.specs.ssd.name}
                          </li>
                        )}
                        {item.specs.hdd && (
                          <li>
                            <strong>HDD:</strong> {item.specs.hdd.name}
                          </li>
                        )}
                        {item.specs.psu && (
                          <li>
                            <strong>Блок питания:</strong> {item.specs.psu.name}
                          </li>
                        )}
                        {item.specs.motherboard && (
                          <li>
                            <strong>Материнская плата:</strong>{" "}
                            {item.specs.motherboard.name}
                          </li>
                        )}
                        {item.specs.cooler && (
                          <li>
                            <strong>Охлаждение:</strong>{" "}
                            {item.specs.cooler.name}
                          </li>
                        )}
                        {item.specs.case && (
                          <li>
                            <strong>Корпус:</strong> {item.specs.case.name}
                          </li>
                        )}
                        {item.specs.os && (
                          <li>
                            <strong>ОС:</strong> {item.specs.os.name}
                          </li>
                        )}
                      </ul>
                    )}

                    <div className="flex items-center mt-4">
                      <label className="mr-2 text-gray-400">Кол-во:</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value, 10))
                        }
                        className="w-20 border rounded px-2 py-1 text-center text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6 text-right">
              <p className="text-xl font-semibold mb-4 text-white">
                Общая сумма: {formattedTotal}
              </p>
              <div className="space-x-4">
                <button
                  className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
                  onClick={clearCart}>
                  Очистить
                </button>
                <button className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition">
                  Оформить заказ
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
