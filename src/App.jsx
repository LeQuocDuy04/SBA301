import { useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { login } from "./services/authService.js";

const pageTitles = {
  Dashboard: "Dashboard",
  Category: "Category Management",
  News: "News Management",
  Users: "User Management",
  Settings: "Settings",
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fu_current_user")) || null;
    } catch {
      return null;
    }
  });

  const [activePage, setActivePage] = useState("Dashboard");
  const [loginError, setLoginError] = useState("");

  function handleLogin(username, password) {
    const result = login(username, password);

    if (!result.success) {
      setLoginError(result.message);
      return;
    }

    localStorage.setItem(
        "fu_current_user",
        JSON.stringify(result.user)
    );

    setCurrentUser(result.user);
    setLoginError("");
  }

  function handleLogout() {
    localStorage.removeItem("fu_current_user");
    setCurrentUser(null);
    setActivePage("Dashboard");
  }

  if (!currentUser) {
    return (
        <LoginPage
            onLogin={handleLogin}
            error={loginError}
        />
    );
  }

  let page;

  switch (activePage) {
    case "Category":
      page = <CategoryPage />;
      break;

    case "News":
      page = <NewsPage />;
      break;

    case "Users":
      page = <UsersPage />;
      break;

    case "Settings":
      page = <SettingsPage currentUser={currentUser} />;
      break;

    default:
      page = <Dashboard />;
  }

  return (
      <div className="app-shell">
        <Sidebar
            activePage={activePage}
            onNavigate={setActivePage}
        />

        <div className="main-area">
          <Header
              title={pageTitles[activePage]}
              currentUser={currentUser}
              onLogout={handleLogout}
          />

          <main className="page-content">
            {page}
          </main>
        </div>
      </div>
  );
}