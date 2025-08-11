import React from "react";
import Footer from "../components/Footer";

const Delivery = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <main className="flex-grow max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 text-primary-gradient text-center tracking-wide font-cinzel uppercase">
          ДОСТАВКА
        </h1>

        {/* Карточка доставки */}
        <div className="bg-[#1a1a1a] rounded-xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-lg">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 uppercase font-cinzel">
              Условия доставки
            </h2>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Мы осуществляем доставку по всему региону курьерской службой или
              через транспортные компании. Возможен самовывоз из офиса по
              предварительной договорённости.
            </p>

            <ul className="text-gray-400 list-disc list-inside space-y-2">
              <li>Быстрая доставка в течение 1–3 дней</li>
              <li>Отслеживание заказа</li>
              <li>Удобное время и способ получения</li>
            </ul>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/assets/delivery.png"
              alt="Доставка"
              className="max-w-xs rounded-xl"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Delivery;
