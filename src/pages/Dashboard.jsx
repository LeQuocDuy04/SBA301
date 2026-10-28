import { useMemo } from "react";
import {
    FolderKanban,
    Newspaper,
    Users,
    Activity,
} from "lucide-react";
import { readList } from "../services/storageService.js";

export default function Dashboard() {
    const counts = useMemo(() => {
        const categories = readList("categories");
        const news = readList("news");
        const users = readList("users");

        return {
            categories: categories.length,
            news: news.length,
            users: users.length,
            activeNews: news.filter((item) => item.status === 1).length,
        };
    }, []);

    const stats = [
        {
            label: "Categories",
            value: counts.categories,
            icon: FolderKanban,
            tone: "green",
        },
        {
            label: "News articles",
            value: counts.news,
            icon: Newspaper,
            tone: "blue",
        },
        {
            label: "User accounts",
            value: counts.users,
            icon: Users,
            tone: "purple",
        },
        {
            label: "Active news",
            value: counts.activeNews,
            icon: Activity,
            tone: "orange",
        },
    ];

    return (
        <div className="page-stack">
            <section className="welcome-banner">
                <div>
                    <p className="eyebrow">OVERVIEW</p>
                    <h2>Good day, Admin!</h2>
                    <p>
                        Here is a quick overview of your news management workspace.
                    </p>
                </div>

                <div className="welcome-art">
                    <Newspaper size={65} strokeWidth={1.2} />
                </div>
            </section>

            <div className="stats-grid">
                {stats.map(({ label, value, icon: Icon, tone }) => (
                    <article className="stat-card" key={label}>
                        <div className={`stat-icon ${tone}`}>
                            <Icon size={21} />
                        </div>

                        <p>{label}</p>
                        <strong>{value}</strong>
                    </article>
                ))}
            </div>

            <section className="panel">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">GET STARTED</p>
                        <h2>Workspace overview</h2>
                    </div>
                </div>

                <p className="muted">
                    Use the sidebar to manage categories, news articles and user
                    accounts. Data is stored in your browser for this assignment.
                </p>
            </section>
        </div>
    );
}