import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/admin_login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.status === "success") {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.admin, is_admin: 1 })
      );
      setUser(data.admin);
      navigate("/admin/dashboard");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Вход администратора</h2>
      {error && <div className="bg-red-200 p-2 mb-2 text-red-800">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full">
          Войти
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
