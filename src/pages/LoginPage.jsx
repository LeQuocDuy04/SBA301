import { useState } from "react";
import { Newspaper, LockKeyhole } from "lucide-react";

export default function LoginPage({ onLogin, error }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onLogin(username, password);
    }

    return (
        <main className="login-screen">
            <section className="login-card">
                <div className="login-brand">
                    <div className="brand-mark large">
                        <Newspaper size={28} />
                    </div>

                    <p className="eyebrow">FUNewsManagementSystem</p>
                    <h1>Welcome back</h1>
                    <p className="muted">
                        Sign in to manage campus news and announcements.
                    </p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        autoComplete="username"
                        placeholder="Enter username"
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        placeholder="Enter password"
                    />

                    {error && (
                        <p className="form-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        className="button button-primary full-width"
                        type="submit"
                    >
                        <LockKeyhole size={17} />
                        Sign in
                    </button>
                </form>

                <div className="demo-credentials">
                    <strong>Demo account</strong>
                    <span>Username: Admin</span>
                    <span>Password: Admin</span>
                </div>
            </section>
        </main>
    );
}