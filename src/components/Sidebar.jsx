import {
    LayoutDashboard,
    FolderKanban,
    Newspaper,
    Users,
    Settings,
    GraduationCap,
} from "lucide-react";

const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Category", icon: FolderKanban },
    { label: "News", icon: Newspaper },
    { label: "Users", icon: Users },
    { label: "Settings", icon: Settings },
];

export default function Sidebar({ activePage, onNavigate }) {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-mark">
                    <GraduationCap size={24} />
                </div>

                <div>
                    <strong>FU News</strong>
                    <span>Management portal</span>
                </div>
            </div>

            <p className="nav-caption">WORKSPACE</p>

            <nav>
                {menuItems.map(({ label, icon: Icon }) => (
                    <button
                        key={label}
                        type="button"
                        className={`nav-item ${
                            activePage === label ? "active" : ""
                        }`}
                        onClick={() => onNavigate(label)}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <span className="status-dot" />
                Mock data mode
            </div>
        </aside>
    );
}