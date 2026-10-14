import { Navigate, Route, Routes } from "react-router-dom";
import AppNavBar from "./components/AppNavBar.jsx";
import CategoryList from "./pages/CategoryList.jsx";
import EditCategory from "./pages/EditCategory.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <AppNavBar />
      <main className="container py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate to="/categories" replace />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/:id/edit" element={<EditCategory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="app-footer">
        SBA301 · Slot 23 · React CRUD Client · FUNews Management
      </footer>
    </div>
  );
}
