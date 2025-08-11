import React, { useState } from "react";
import Footer from "../components/Footer";
import { intelBuilds } from "../data/intelBuilds";
import { amdBuilds } from "../data/amdBuilds";
import { Cpu, HardDrive, MemoryStick, MonitorSmartphone } from "lucide-react";
import { getName } from "../utils";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

const allBuilds = [...intelBuilds, ...amdBuilds];

const extractOptions = (field) => {
  const options = allBuilds.map((b) => {
    const val = b.specs[field];
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val.name || "";
    return "";
  });
  return [...new Set(options)].filter(Boolean);
};

const GamingPC = () => {
  const [filters, setFilters] = useState({ gpu: "", cpu: "", ram: "" });
  const [sortOrder, setSortOrder] = useState("asc");

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({ gpu: "", cpu: "", ram: "" });
    setSortOrder("asc");
  };

  const getPriceValue = (priceStr) => parseInt(priceStr.replace(/[^\d]/g, ""));

  const filteredBuilds = allBuilds.filter((b) => {
    return (
      (!filters.gpu ||
        (getName(b.specs.gpu) || "").toLowerCase() ===
          filters.gpu.toLowerCase()) &&
      (!filters.cpu ||
        (getName(b.specs.cpu) || "").toLowerCase() ===
          filters.cpu.toLowerCase()) &&
      (!filters.ram ||
        (getName(b.specs.ram) || "").toLowerCase() ===
          filters.ram.toLowerCase())
    );
  });

  const sortedBuilds = [...filteredBuilds].sort((a, b) => {
    const priceA = getPriceValue(a.price);
    const priceB = getPriceValue(b.price);
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleCardClick = (build) => {
    navigate(`/pc/${build.category}/${build.id ?? idx}`);
  };

  const handleAddToCart = (e, build) => {
    e.stopPropagation();
    addToCart(build);
    navigate("/cart");
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Игровые ПК</h1>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-4 mb-6">
          {["gpu", "cpu", "ram"].map((field) => (
            <select
              key={field}
              className="bg-[#1f1f1f] text-white px-4 py-2 rounded border border-gray-600"
              onChange={(e) => handleFilterChange(field, e.target.value)}
              value={filters[field]}>
              <option value="">
                {
                  {
                    gpu: "Видеокарты",
                    cpu: "Процессоры",
                    ram: "Оперативная память",
                  }[field]
                }
              </option>
              {extractOptions(field).map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}

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

        {/* Карточки сборок */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBuilds.map((build) => (
            <div
              key={build.id}
              className="cursor-pointer bg-[#151515] rounded-xl p-6 border border-[#333] shadow-md hover:scale-105 transition hover:ring-1 hover:ring-yellow-500"
              onClick={() => handleCardClick(build)}>
              <h3 className="text-xl font-semibold text-[#FFD700] text-center mb-4">
                {build.name}
              </h3>

              <div className="h-72 rounded mb-4 flex items-center justify-center">
                <img
                  src={build.image}
                  alt={build.name}
                  className="h-full max-h-72 w-auto object-contain rounded-lg"
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
                    {getName(build.specs.gpu)}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Cpu size={16} />
                  <span>
                    <strong className="text-white">Процессор:</strong>{" "}
                    {getName(build.specs.cpu)}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <HardDrive size={16} />
                  <span>
                    <strong className="text-white">SSD накопитель:</strong>{" "}
                    {getName(build.specs.ssd)}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <MemoryStick size={16} />
                  <span>
                    <strong className="text-white">Оперативная память:</strong>{" "}
                    {getName(build.specs.ram)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  className="gold-button px-4 py-2 rounded hover:bg-yellow-600 transition"
                  onClick={(e) => handleAddToCart(e, build)}>
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
      </main>
      <Footer />
    </div>
  );
};

export default GamingPC;
