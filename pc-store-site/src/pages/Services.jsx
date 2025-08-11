import React from "react";
import Footer from "../components/Footer";

const services = [
  {
    title: "Диагностика",
    description: "Проверка комплектующих и выявление неисправностей.",
    price: "от 500 ₽",
    image: "/assets/services/diagnostics.avif",
  },
  {
    title: "Установка ПО",
    description: "Установка Windows, драйверов и нужных программ.",
    price: "от 700 ₽",
    image: "/assets/services/software.avif",
  },
  {
    title: "Сборка ПК",
    description: "Сборка с кабель-менеджментом и тестированием.",
    price: "от 1500 ₽",
    image: "/assets/services/build.avif",
  },
  {
    title: "Апгрейд",
    description: "Обновим комплектующие и улучшим производительность.",
    price: "от 1000 ₽",
    image: "/assets/services/upgrade.avif",
  },
];

const Services = () => {
  return (
    <>
      <section className="px-4 sm:px-10 py-12 bg-[#0f0f0f] min-h-screen">
        <h1 className="text-4xl font-bold mb-10 text-center">Наши услуги</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1a] text-center border border-[#333] rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
              <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-72 object-cover mt-4 px-6 rounded-xl"
              />
              <hr className="border-gray-700 my-4 mx-6" />
              <p className="text-gray-400 px-4 mb-2">{service.description}</p>
              <div className="text-yellow-400 font-medium mb-4">
                {service.price}
              </div>
              <button className="mb-6 mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl">
                Заказать
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
