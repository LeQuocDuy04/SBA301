export default function SettingsPage({ currentUser }) {
    return (
        <section className="panel">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">PREFERENCES</p>
                    <h2>Settings</h2>
                </div>
            </div>

            <div className="settings-row">
                <span>Application</span>
                <strong>FUNewsManagementSystem</strong>
            </div>

            <div className="settings-row">
                <span>Signed-in user</span>
                <strong>{currentUser.username}</strong>
            </div>

            <div className="settings-row">
                <span>Role</span>
                <strong>{currentUser.roleName}</strong>
            </div>

            <div className="settings-row">
                <span>Data storage</span>
                <strong>Browser localStorage</strong>
            </div>

            <div className="notice">
                Mock authentication is for this assignment only. Do not use it
                as production authentication.
            </div>
        </section>
    );
}