import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import { intelBuilds } from "../data/intelBuilds";
import { amdBuilds } from "../data/amdBuilds";
import { Cpu, HardDrive, MemoryStick, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

const categories = [
  {
    name: "Игровые компьютеры",
    description: "Для геймеров и энтузиастов",
    link: "/pc/gaming",
    image: "/assets/PC/gaming.avif",
  },
  {
    name: "Офисные компьютеры",
    description: "Надежные решения для офиса",
    link: "/pc/office",
    image: "/assets/PC/office.avif",
  },
  {
    name: "Профессиональные сборки",
    description: "Для дизайнеров, 3D и монтажа",
    link: "/pc/pro",
    image: "/assets/PC/pro.avif",
  },
  {
    name: "Конфигуратор ПК",
    description: "Собери компьютер сам",
    link: "/configurator",
    image: "/assets/PC/configurator.avif",
  },
];

const Home = ({ user, setUser }) => {
  const featuredIntel = intelBuilds.slice(0, 2);
  const featuredAmd = amdBuilds.slice(0, 2);
  const featuredBuilds = [...featuredIntel, ...featuredAmd];

  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      specs: item.specs,
      category: item.category,
      quantity: 1,
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <HeroSlider />

      {/* Категории */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-12">
        {categories.map((category, idx) => (
          <a
            key={idx}
            href={category.link}
            className="bg-[#151515] rounded-xl p-4 border border-[#333] shadow-lg hover:scale-105 transition flex items-center gap-4">
            <img
              src={category.image}
              alt={category.name}
              className="w-40 h-40 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
              <p className="text-gray-400 text-sm">{category.description}</p>
            </div>
          </a>
        ))}
      </section>

      {/* Готовые сборки */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-yellow-400">
          Готовые сборки в наличии
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBuilds.map((build, idx) => (
            <div
              key={idx}
              className="bg-[#151515] rounded-xl p-6 border border-[#333] shadow-md hover:scale-105 transition hover:ring-1 hover:ring-yellow-500 flex flex-col">
              <h3 className="text-xl font-semibold text-[#FFD700] text-center mb-4">
                {build.name}
              </h3>

              <div className="h-48 rounded mb-4 flex items-center justify-center">
                <img
                  src={build.image}
                  alt={build.name}
                  className="h-full object-contain rounded-lg"
                />
              </div>

              <div className="text-xl font-bold text-[#FFD700] mb-4 text-center">
                {build.price}
              </div>

              <div className="text-sm text-gray-300 space-y-2 text-center">
                <div className="flex items-center gap-2 justify-center">
                  <MonitorSmartphone size={16} />
                  <span>
                    <strong className="text-white">GPU:</strong>{" "}
                    {build.specs.gpu?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Cpu size={16} />
                  <span>
                    <strong className="text-white">CPU:</strong>{" "}
                    {build.specs.cpu?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <HardDrive size={16} />
                  <span>
                    <strong className="text-white">SSD:</strong>{" "}
                    {build.specs.ssd?.name || build.specs.ssd}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <MemoryStick size={16} />
                  <span>
                    <strong className="text-white">RAM:</strong>{" "}
                    {build.specs.ram?.name}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => handleAddToCart(build)}
                  className="gold-button px-4 py-2 rounded hover:bg-yellow-600 transition">
                  В корзину
                </button>
                <Link to={`/pc/${build.category}/${build.id}`}>
                  <button className="gold-button px-4 py-2 rounded hover:bg-yellow-600 transition">
                    Подробнее
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Уведомление о добавлении */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg z-50 animate-fade-in-out">
          ✅ Товар добавлен в корзину
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
