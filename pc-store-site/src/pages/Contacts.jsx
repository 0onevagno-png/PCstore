import React, { useState } from "react";
import Footer from "../components/Footer";

const Contacts = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cover bg-center text-white">
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/public/assets/bg1.avif')` }}>
        <div className="bg-black/70 min-h-screen">
          <div className="max-w-4xl mx-auto p-8">
            <main className="flex-grow px-8 py-12 max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center">Контакты</h1>

              <section className="mb-12 grid md:grid-cols-2 gap-10">
                {/* Информация */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Адрес</h2>
                    <p>г. Москва, ул. Ленина, д. 10, офис 5</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Время работы
                    </h2>
                    <p>Пн-Пт: 9:00 – 18:00</p>
                    <p>Сб: 10:00 – 16:00</p>
                    <p>Вс: выходной</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Телефон</h2>
                    <a
                      href="tel:+74951234567"
                      className="text-yellow-400 hover:underline">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>

                {/* Фото пункта выдачи */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-2">Пункты выдачи</h2>
                  <img
                    src="/public/assets/pickup1.avif"
                    alt="Пункт выдачи 1"
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                  <img
                    src="/public/assets/pickup2.avif"
                    alt="Пункт выдачи 2"
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                </div>
              </section>

              {/* Форма обратной связи */}
              <section className="max-w-lg mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                  Обратная связь
                </h2>

                {submitted ? (
                  <div className="bg-green-700 text-green-100 p-4 rounded text-center">
                    Спасибо! Ваше сообщение отправлено.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block mb-1" htmlFor="name">
                        Имя
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-gray-600 focus:outline-yellow-500"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div>
                      <label className="block mb-1" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-gray-600 focus:outline-yellow-500"
                        placeholder="example@mail.com"
                      />
                    </div>

                    <div>
                      <label className="block mb-1" htmlFor="message">
                        Сообщение
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-gray-600 focus:outline-yellow-500 resize-none"
                        placeholder="Ваше сообщение"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-yellow-500 text-black font-semibold py-3 rounded hover:bg-yellow-600 transition">
                      Отправить
                    </button>
                  </form>
                )}
              </section>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;
