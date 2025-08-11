import React from "react";
import Footer from "../components/Footer";

const Payment = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <main className="flex-grow max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 text-primary-gradient text-center tracking-wide font-cinzel uppercase">
          СПОСОБЫ ОПЛАТЫ
        </h1>

        {/* Карточка Безналичный расчет */}
        <div className="bg-[#1a1a1a] rounded-xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-lg mb-12">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 uppercase font-cinzel">
              Безналичный расчет
            </h2>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Вы можете оплатить заказ онлайн через ЮMoney с помощью дебетовых и
              кредитных карт этих платёжных систем:
            </p>

            <div className="flex gap-6 items-center">
              <img src="/assets/icons/visa.png" alt="Visa" className="h-8" />
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/assets/payment-cards.avif"
              alt="Платежные карты"
              className="max-w-xs rounded-xl"
            />
          </div>
        </div>

        {/* Карточка Оплата наличными в офисе */}
        <div className="bg-[#1a1a1a] rounded-xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-lg">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 uppercase font-cinzel">
              Оплата наличными в офисе
            </h2>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Вы можете оплатить заказ наличными при посещении нашего офиса в
              удобное для вас время.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/assets/cash-payment.png"
              alt="Оплата наличными"
              className="max-w-xs "
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
