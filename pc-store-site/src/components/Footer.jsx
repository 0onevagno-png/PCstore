import React from "react";
import { FaPhone, FaEnvelope, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-700 px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Логотип и адрес */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-xl font-bold">
            <img src="/assets/Logo.svg" alt="Logo" className="h-8" />
            <span className="text-primary-gradient">PC STORE</span>
          </div>
          <p className="text-gray-400">
            г. Москва, ул. Пушкина, д. 42, оф. 8<br />
            Ежедневно с 10:00 до 20:00
          </p>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Контакты</h4>
          <ul className="text-gray-400 space-y-2">
            <li className="flex items-center gap-2">
              <FaPhone className="text-yellow-400" />
              <a href="tel:+79991234567" className="hover:text-yellow-400">
                +7 (999) 123-45-67
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-400" />
              <a
                href="mailto:info@pcstore.ru"
                className="hover:text-yellow-400">
                info@pcstore.ru
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaTelegramPlane className="text-yellow-400" />
              <a
                href="https://t.me/telegram"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400">
                @pcstore
              </a>
            </li>
          </ul>
        </div>

        {/* Услуги */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Услуги</h4>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="/services" className="hover:text-yellow-400">
                Диагностика
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-yellow-400">
                Сборка ПК
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-yellow-400">
                Установка ПО
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-yellow-400">
                Апгрейд
              </a>
            </li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-white">Продукция</h4>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="/pc/gaming" className="hover:text-yellow-400">
                Игровые ПК
              </a>
            </li>
            <li>
              <a href="/pc/office" className="hover:text-yellow-400">
                Офисные ПК
              </a>
            </li>
            <li>
              <a href="/pc/pro" className="hover:text-yellow-400">
                Профессиональные ПК
              </a>
            </li>
          </ul>
        </div>

        {/* Компания и поддержка */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Компания</h4>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="/contacts" className="hover:text-yellow-400">
                Контакты
              </a>
            </li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-white">Поддержка</h4>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="/clients/payment" className="hover:text-yellow-400">
                Оплата
              </a>
            </li>
            <li>
              <a href="/clients/delivery" className="hover:text-yellow-400">
                Доставка
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-xs">
        © 2025 PC STORE. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
