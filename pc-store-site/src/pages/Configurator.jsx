import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext"; // импортируем контекст корзины

const componentCategories = [
  { key: "cpus", label: "Процессор" },
  { key: "motherboards", label: "Материнская плата" },
  { key: "gpus", label: "Видеокарта" },
  { key: "rams", label: "Оперативная память" },
  { key: "hdds", label: "ЖД диск" },
  { key: "ssds", label: "SSD" },
  { key: "ssds_extra", label: "Доп SSD" },
  { key: "psus", label: "Блок питания" },
  { key: "network_cards", label: "Сетевая карта" },
  { key: "coolings", label: "Охлаждение" },
  { key: "cases", label: "Корпус" },
];

const Configurator = () => {
  const { addToCart } = useCart(); // получаем функцию добавления в корзину

  const [components, setComponents] = useState({});
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedComponents");
    return saved ? JSON.parse(saved) : {};
  });
  const [activeCategory, setActiveCategory] = useState("cpus");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllComponents = async () => {
      const newComponents = {};
      for (let { key } of componentCategories) {
        try {
          const res = await axios.get(`/api/${key}.php`);
          newComponents[key] = res.data;
        } catch (error) {
          console.error(`Ошибка при загрузке ${key}:`, error);
        }
      }
      setComponents(newComponents);
    };
    fetchAllComponents();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedComponents", JSON.stringify(selected));
  }, [selected]);

  const handleSelect = (type, item) => {
    setSelected((prev) => ({
      ...prev,
      [type]: prev[type]?.id === item.id ? null : item,
    }));
  };

  const clearAll = () => {
    setSelected({});
    setSelectedBrand("");
    setSearchTerm("");
  };

  const totalPrice = Object.values(selected).reduce(
    (sum, item) => sum + (parseFloat(item?.price) || 0),
    0
  );

  const currentComponents = components[activeCategory] || [];

  // Генерация списка брендов
  const brandOptions = [
    ...new Set(currentComponents.map((item) => item.brand).filter(Boolean)),
  ];

  // Фильтрация по бренду и текстовому поиску
  let filteredComponents = currentComponents.filter((item) => {
    const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  // Фильтр несовместимых материнских плат
  if (activeCategory === "motherboards" && selected["cpus"]) {
    const cpuBrand = selected["cpus"].brand;

    filteredComponents = filteredComponents.filter(
      (mb) => mb.brand === cpuBrand
    );
  }

  // Функция для добавления конфигурации в корзину
  const handleAddToCart = () => {
    // Проверяем, что есть выбранные компоненты
    if (Object.values(selected).filter(Boolean).length === 0) {
      alert("Пожалуйста, выберите хотя бы один компонент.");
      return;
    }

    // Формируем объект заказа с выбранными компонентами
    const configItem = {
      id: Date.now(), // уникальный id для корзины
      name: "Сборка ПК из конфигуратора",
      components: selected,
      quantity: 1,
      price: totalPrice.toFixed(2),
    };

    addToCart(configItem);

    alert("Конфигурация добавлена в корзину!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Конфигуратор ПК
        </h1>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-1/5 space-y-4">
            <h2 className="text-xl font-semibold mb-4 px-2 text-white">
              Комплектующие
            </h2>
            {componentCategories.map(({ key, label }) => (
              <div
                key={key}
                onClick={() => {
                  setActiveCategory(key);
                  setSelectedBrand("");
                  setSearchTerm("");
                }}
                className={`bg-[#151515] rounded-xl p-4 border border-[#333] shadow-lg transition hover:scale-[1.02] cursor-pointer ${
                  activeCategory === key
                    ? "border-yellow-400 ring-1 ring-yellow-300"
                    : ""
                }`}>
                <h3
                  className={`text-base font-semibold mb-1 ${
                    activeCategory === key ? "text-yellow-400" : "text-white"
                  }`}>
                  {label}
                </h3>
                {selected[key] ? (
                  <div className="text-gray-400 text-sm mt-2 bg-[#1f1f1f] p-2 rounded">
                    <p className="truncate">{selected[key].name}</p>
                    <p className="text-xs text-gray-500">
                      {selected[key].price} ₽
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">Не выбрано</p>
                )}
              </div>
            ))}

            <button
              onClick={clearAll}
              className="w-full mt-4 text-sm px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Очистить всё
            </button>
          </div>

          {/* Center */}
          <div className="w-3/5 min-h-[400px] px-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {componentCategories.find((c) => c.key === activeCategory)?.label}
            </h2>

            {/* Фильтры */}
            <div className="flex gap-4 mb-6">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-[#1f1f1f] text-white px-3 py-2 rounded border border-[#333]">
                <option value="">Все бренды</option>
                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Поиск по названию..."
                className="flex-1 px-3 py-2 rounded bg-[#1f1f1f] text-white border border-[#333]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              {filteredComponents.map((item) => {
                const isSelected = selected[activeCategory]?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className="bg-[#151515] border border-[#333] rounded-xl p-4 flex items-center shadow h-[140px] text-white">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-semibold">{item.price} ₽</p>
                    </div>
                    <button
                      onClick={() => handleSelect(activeCategory, item)}
                      className={`px-4 py-2 rounded transition ml-4 ${
                        isSelected
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      } text-white font-semibold`}>
                      {isSelected ? "Убрать" : "Добавить"}
                    </button>
                  </div>
                );
              })}

              {filteredComponents.length === 0 && (
                <p className="text-white">Нет подходящих компонентов</p>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-[280px] min-w-[50px] max-w-[280px] border border-[#333] bg-[#151515] rounded-xl p-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Сумма:</h2>
              <p className="text-2xl font-bold text-green-400 mb-6">
                {totalPrice.toFixed(0)} ₽
              </p>

              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">
                Купить
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Configurator;
