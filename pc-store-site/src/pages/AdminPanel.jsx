import React, { useState, useEffect } from "react";

const STORAGE_KEYS = {
  amd: "amdBuilds",
  intel: "intelBuilds",
  office: "officeBuilds",
  pro: "proBuilds",
  configurator: "configuratorBuilds",
};

const categories = ["amd", "intel", "office", "pro", "Configurator"];

const AdminPanel = () => {
  const [category, setCategory] = useState("amd");
  const storageKey = STORAGE_KEYS[category];

  const getBuilds = () => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  };

  const saveBuilds = (builds) => {
    localStorage.setItem(storageKey, JSON.stringify(builds));
  };

  const [builds, setBuilds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    cpu: "",
    motherboard: "",
    gpu: "",
    ram: "",
    hdd: "",
    ssd: "",
    ssd2: "",
    psu: "",
    nic: "",
    cooling: "",
    case: "",
    description: "",
  });

  useEffect(() => {
    setBuilds(getBuilds());
    setEditingId(null);
    setFormData({
      title: "",
      price: "",
      cpu: "",
      motherboard: "",
      gpu: "",
      ram: "",
      hdd: "",
      ssd: "",
      ssd2: "",
      psu: "",
      nic: "",
      cooling: "",
      case: "",
      description: "",
    });
  }, [storageKey]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const startEdit = (build) => {
    setEditingId(build.id);
    setFormData({
      ...formData,
      ...build,
      price: build.price?.toString() || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      price: "",
      cpu: "",
      motherboard: "",
      gpu: "",
      ram: "",
      hdd: "",
      ssd: "",
      ssd2: "",
      psu: "",
      nic: "",
      cooling: "",
      case: "",
      description: "",
    });
  };

  const saveBuild = () => {
    if (!formData.title.trim()) {
      alert("Название обязательно");
      return;
    }
    const normalizedBuild = {
      ...formData,
      price: formData.price === "" ? 0 : Number(formData.price),
    };
    if (editingId === null) {
      const newBuild = { id: Date.now(), ...normalizedBuild };
      const updated = [...builds, newBuild];
      setBuilds(updated);
      saveBuilds(updated);
    } else {
      const updated = builds.map((b) =>
        b.id === editingId ? { ...b, ...normalizedBuild } : b
      );
      setBuilds(updated);
      saveBuilds(updated);
    }
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Удалить эту сборку?")) return;
    const updated = builds.filter((b) => b.id !== id);
    setBuilds(updated);
    saveBuilds(updated);
    if (editingId === id) cancelEdit();
  };

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Админ-панель</h2>
      <div className="mb-6 flex gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-600 text-gray-200 hover:bg-gray-700"
            }`}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mb-8 border border-gray-700 rounded p-4 bg-gray-800">
        <h3 className="text-xl font-semibold mb-4">
          {editingId === null
            ? "Добавить новую сборку"
            : "Редактирование сборки"}
        </h3>

        {Object.entries(formData).map(([key, value]) =>
          key !== "description" ? (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={key.toUpperCase()}
              value={value}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
            />
          ) : (
            <textarea
              key={key}
              name={key}
              placeholder="Описание"
              value={value}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 rounded bg-gray-700 text-white resize-none"
              rows={3}
            />
          )
        )}

        <div className="flex gap-2">
          <button
            onClick={saveBuild}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            Сохранить
          </button>
          {editingId !== null && (
            <button
              onClick={cancelEdit}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">
              Отмена
            </button>
          )}
        </div>
      </div>

      <ul className="space-y-4">
        {builds.map((build) => (
          <li
            key={build.id}
            className="border border-gray-700 rounded p-4 bg-gray-800 flex flex-col md:flex-row md:justify-between items-start md:items-center">
            <div>
              <h4 className="text-lg font-semibold">{build.title}</h4>
              <p>Цена: {build.price}₽</p>
              <p>CPU: {build.cpu}</p>
              <p>Материнская плата: {build.motherboard}</p>
              <p>GPU: {build.gpu}</p>
              <p>RAM: {build.ram}</p>
              <p>HDD: {build.hdd}</p>
              <p>SSD: {build.ssd}</p>
              <p>Доп. SSD: {build.ssd2}</p>
              <p>Блок питания: {build.psu}</p>
              <p>Сетевая карта: {build.nic}</p>
              <p>Охлаждение: {build.cooling}</p>
              <p>Корпус: {build.case}</p>
              <p>{build.description}</p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">
              <button
                onClick={() => startEdit(build)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                ✏️ Редактировать
              </button>
              <button
                onClick={() => handleDelete(build.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                🗑️ Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
