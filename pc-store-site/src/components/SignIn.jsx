import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onClose, onSwitch, onSuccess }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [toast, setToast] = useState("");
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setToast("");

    const localErrors = [];

    if (password.length < 8) {
      localErrors.push("Пароль должен быть не менее 8 символов.");
    }

    if (!identifier.match(/@/) && !identifier.match(/^\+?\d{10,15}$/)) {
      localErrors.push("Введите корректный Email или номер телефона.");
    }

    if (localErrors.length > 0) {
      setErrors(localErrors);
      return;
    }

    try {
      const response = await fetch("core/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Parsed result:", result);

      if (result.success) {
        setToast("Успешный вход!");
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        onSuccess(user);

        setTimeout(() => {
          onClose();

          if (user.is_admin === "1" || user.is_admin === 1) {
            navigate("/admin");
          } else {
            navigate("/profile");
          }
        }, 1000);
      } else {
        setErrors(
          result.errors || [result.error || "Неверный логин или пароль."]
        );
      }
    } catch (err) {
      setErrors([`Ошибка соединения с сервером: ${err.message}`]);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
      <div
        className="bg-white text-black rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative"
        ref={modalRef}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
          onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Вход</h2>

        {toast && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-3 text-center font-medium">
            {toast}
          </div>
        )}

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm space-y-1">
            {errors.map((err, i) => (
              <div key={i}>• {err}</div>
            ))}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Телефон или Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            Войти
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Нет аккаунта?{" "}
          <button
            onClick={onSwitch}
            className="text-blue-600 hover:underline focus:outline-none"
            type="button">
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
