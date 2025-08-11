import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

const Profile = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState("orders");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthdate: "",
    delivery: "",
  });

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  // Загрузка сохранённых данных профиля из localStorage при монтировании
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
      setFormData((prev) => ({ ...prev, ...savedProfile }));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    setMessage("Вы вышли из аккаунта");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage("");

    // Проверка обязательных полей
    const newErrors = [];
    if (!formData.firstName.trim()) newErrors.push("Имя обязательно.");
    if (!formData.lastName.trim()) newErrors.push("Фамилия обязательна.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      phone: formData.phone,
      birthdate: formData.birthdate,
      delivery: formData.delivery,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("userProfile", JSON.stringify(formData));

    setMessage("Данные профиля сохранены!");
    setErrors([]);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Профиль</h1>

        {message && (
          <div className="bg-green-600 text-white px-4 py-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        {user ? (
          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-gray-700">
            <p className="mb-4">
              <span className="font-semibold">Вы вошли как:</span>{" "}
              {user.phone || user.email || "Не указано"}
            </p>

            {/* Навигация */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 rounded ${
                  activeTab === "orders"
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}>
                Мои заказы
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2 rounded ${
                  activeTab === "settings"
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}>
                Настройки профиля
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700">
                Выйти
              </button>
            </div>

            {/* Контент вкладок */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Мои заказы</h2>
                <p className="text-gray-400">У вас нет заказов.</p>
              </div>
            )}

            {activeTab === "settings" && (
              <form onSubmit={handleSave} className="space-y-4 mt-4">
                {errors.length > 0 && (
                  <div className="bg-red-700 text-white p-3 rounded">
                    {errors.map((err, i) => (
                      <p key={i}>• {err}</p>
                    ))}
                  </div>
                )}
                <div>
                  <label className="block text-sm mb-1">Имя *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Фамилия *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Телефон</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Дата рождения</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Адрес доставки</label>
                  <textarea
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded">
                  Сохранить
                </button>
              </form>
            )}
          </div>
        ) : (
          <p className="text-gray-400">Вы не вошли в аккаунт.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
