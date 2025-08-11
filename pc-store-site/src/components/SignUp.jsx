import React, { useState } from "react";

const SignUp = ({ onClose, onSwitch }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [toast, setToast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setToast("");

    const localErrors = [];

    if (password.length < 8) {
      localErrors.push("Пароль должен быть не менее 8 символов.");
    }

    if (password !== repeatPassword) {
      localErrors.push("Пароли не совпадают.");
    }

    if (!identifier.match(/@/) && !identifier.match(/^\+?\d{10,15}$/)) {
      localErrors.push("Введите корректный Email или номер телефона.");
    }

    if (localErrors.length > 0) {
      setErrors(localErrors);
      return;
    }

    try {
      const response = await fetch("core/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setToast("Регистрация прошла успешно!");
        setTimeout(() => {
          setToast("");
          onClose();
        }, 3000);
      } else {
        setErrors(result.errors || ["Не удалось зарегистрироваться."]);
      }
    } catch (err) {
      setErrors(["Ошибка соединения с сервером."]);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white text-black rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
          onClick={onClose}
          aria-label="Закрыть форму регистрации">
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Регистрация</h2>

        {/* Toast уведомление */}
        {toast && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-3 text-center font-medium">
            {toast}
          </div>
        )}

        {/* Ошибки */}
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
          <input
            type="password"
            placeholder="Повторите пароль"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            Зарегистрироваться
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <button
            onClick={onSwitch}
            className="text-blue-600 hover:underline focus:outline-none"
            type="button">
            Войти
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
