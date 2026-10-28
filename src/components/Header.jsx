import { LogOut, Bell } from "lucide-react";

export default function Header({ title, currentUser, onLogout }) {
    return (
        <header className="topbar">
            <div>
                <p className="eyebrow">FUNewsManagementSystem</p>
                <h1>{title}</h1>
            </div>

            <div className="topbar-actions">
                <button
                    className="icon-button"
                    type="button"
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                </button>

                <div className="user-chip">
                    <div className="avatar">
                        {currentUser.username.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <strong>{currentUser.username}</strong>
                        <span>{currentUser.roleName}</span>
                    </div>
                </div>

                <button
                    className="button button-light"
                    type="button"
                    onClick={onLogout}
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </header>
    );
}