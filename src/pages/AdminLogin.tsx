import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // simple login check
    if (username === "admin" && password === "admin123") {

      localStorage.setItem("adminLoggedIn", "true");

      navigate("/admin");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-red-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};