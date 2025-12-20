import React, { useState } from "react";
import { loginUser, registerUser } from "../api/auth";

const STORAGE_TOKEN = "tripsync_token";
const STORAGE_USER = "tripsync_user";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_USER);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

const AuthCard = () => {
  const [mode, setMode] = useState("signin");
  const [user, setUser] = useState(getStoredUser());
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      let data;
      if (mode === "signup") {
        data = await registerUser(form);
      } else {
        data = await loginUser({
          email: form.email,
          password: form.password,
        });
      }

      localStorage.setItem(STORAGE_TOKEN, data.token);
      localStorage.setItem(STORAGE_USER, JSON.stringify(data.user));
      setUser(data.user);
      resetForm();
    } catch (err) {
      const message =
        err?.response?.data?.message || "Unable to authenticate.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    setUser(null);
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h3>Account</h3>
        <p>Sign in to save trips and sync your plans.</p>
      </div>

      {user ? (
        <div className="auth-session">
          <div>
            <span>Signed in as</span>
            <strong>{user.name || user.email}</strong>
          </div>
          <button onClick={handleLogout} className="btn-ghost">
            Sign out
          </button>
        </div>
      ) : (
        <>
          <div className="auth-tabs">
            <button
              className={mode === "signin" ? "is-active" : ""}
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
            <button
              className={mode === "signup" ? "is-active" : ""}
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="input-box"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="input-box"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input-box"
              required
            />
            {error && <p className="tool-error">{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "signup"
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AuthCard;
