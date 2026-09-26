import NavBar from "./components/NavBar";
import Orchids from "./components/Orchids";

function App() {
    return (
        <>
            <NavBar />

            <main id="home">
                <section className="hero-section py-5">
                    <div className="container text-center">
                        <p className="text-uppercase text-secondary fw-semibold">
                            Welcome
                        </p>

                        <h1 className="display-4 fw-bold">
                            Orchid Gallery
                        </h1>

                        <p className="lead text-secondary">
                            Discover beautiful orchids from around
                            the world.
                        </p>
                    </div>
                </section>

                <Orchids />

                <section
                    id="about"
                    className="py-5 bg-light"
                >
                    <div className="container text-center">
                        <h2 className="fw-bold">
                            About Orchid Gallery
                        </h2>

                        <p className="text-secondary">
                            A React SPA demonstrating fetching,
                            loading states, error handling and
                            caching.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default App;