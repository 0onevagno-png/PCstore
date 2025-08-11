import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Cpu, HardDrive, MemoryStick, MonitorSmartphone } from "lucide-react";
import { amdBuilds } from "../data/amdBuilds";
import { useCart } from "../components/CartContext";

const AMDPC = () => {
  const [filters, setFilters] = useState({ gpu: "", cpu: "", ram: "" });
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({ gpu: "", cpu: "", ram: "" });
    setSortOrder("asc");
  };

  const getPriceValue = (priceStr) => parseInt(priceStr.replace(/[^\d]/g, ""));

  const filteredBuilds = amdBuilds.filter((build) => {
    return (
      (!filters.gpu ||
        (build.specs.gpu?.name || "").toLowerCase() ===
          filters.gpu.toLowerCase()) &&
      (!filters.cpu ||
        (build.specs.cpu?.name || "").toLowerCase() ===
          filters.cpu.toLowerCase()) &&
      (!filters.ram ||
        (build.specs.ram?.name || "").toLowerCase() ===
          filters.ram.toLowerCase())
    );
  });

  const sortedBuilds = [...filteredBuilds].sort((a, b) => {
    const priceA = getPriceValue(a.price);
    const priceB = getPriceValue(b.price);
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });

  const extractOptions = (field) => {
    const options = amdBuilds.map((b) => b.specs[field]?.name || "");
    return [...new Set(options)].filter(Boolean);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleAddToCart = (e, build) => {
    e.stopPropagation();
    addToCart({
      id: build.id,
      name: build.name,
      image: build.image,
      price: build.price,
      specs: build.specs,
      category: build.category,
      quantity: 1,
    });
    navigate("/cart");
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Игровые ПК AMD</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="bg-[#1f1f1f] text-white px-4 py-2 rounded border border-gray-600"
            onChange={(e) => handleFilterChange("gpu", e.target.value)}
            value={filters.gpu}>
            <option value="">Видеокарты</option>
            {extractOptions("gpu").map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            className="bg-[#1f1f1f] text-white px-4 py-2 rounded border border-gray-600"
            onChange={(e) => handleFilterChange("cpu", e.target.value)}
            value={filters.cpu}>
            <option value="">Процессоры</option>
            {extractOptions("cpu").map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            className="bg-[#1f1f1f] text-white px-4 py-2 rounded border border-gray-600"
            onChange={(e) => handleFilterChange("ram", e.target.value)}
            value={filters.ram}>
            <option value="">Оперативная память</option>
            {extractOptions("ram").map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <button
            onClick={toggleSortOrder}
            className={`flex items-center gap-2 px-4 py-2 rounded border transition ${
              sortOrder === "asc"
                ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                : "bg-yellow-600 border-yellow-600 text-black hover:bg-yellow-700"
            }`}>
            Сортировка по цене {sortOrder === "asc" ? "↑" : "↓"}
          </button>

          <button
            onClick={resetFilters}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Сбросить фильтры
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBuilds.map((build, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/pc/amd/${build.id || idx}`)}
              className="cursor-pointer bg-[#151515] rounded-xl p-6 border border-[#333] shadow-md hover:scale-105 transition hover:ring-1 hover:ring-yellow-500">
              <h3 className="text-xl font-semibold text-[#FFD700] text-center mb-4">
                {build.name}
              </h3>

              <div className="h-72 rounded mb-4 flex items-center justify-center">
                <img
                  src={build.image}
                  alt={build.name}
                  className="h-full object-contain rounded-lg"
                />
              </div>

              <hr className="border-gray-700 my-4" />

              <div className="text-xl font-bold text-[#FFD700] mb-4 text-center">
                {build.price}
              </div>

              <div className="text-sm mt-4 text-gray-300 space-y-2 text-center">
                <div className="flex items-center gap-2 justify-center">
                  <MonitorSmartphone size={16} />
                  <span>
                    <strong className="text-white">Видеокарта:</strong>{" "}
                    {build.specs.gpu?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Cpu size={16} />
                  <span>
                    <strong className="text-white">Процессор:</strong>{" "}
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
                    <strong className="text-white">ОЗУ:</strong>{" "}
                    {build.specs.ram?.name}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={(e) => handleAddToCart(e, build)}
                  className="gold-button px-4 py-2 rounded hover:bg-yellow-600 transition">
                  В корзину
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/configurator");
                  }}
                  className="gold-button px-4 py-2 rounded hover:bg-yellow-600 transition">
                  Конфигуратор
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AMDPC;
