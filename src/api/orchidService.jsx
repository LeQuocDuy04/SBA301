const CACHE_KEY = "orchids_cache";
const CACHE_TTL = 30 * 1000; // 30 seconds

export async function getOrchids(forceReload = false) {
    // Check cache first
    if (!forceReload) {
        const cachedData = sessionStorage.getItem(CACHE_KEY);

        if (cachedData) {
            try {
                const cache = JSON.parse(cachedData);

                const isValid =
                    Date.now() - cache.timestamp < CACHE_TTL;

                if (isValid) {
                    console.log("Cache HIT");

                    return cache.data;
                }

                console.log("Cache EXPIRED");
            } catch (error) {
                console.log("Invalid cache");
                sessionStorage.removeItem(CACHE_KEY);
            }
        }
    }

    console.log("Cache MISS - Fetching data...");

    const response = await fetch("/orchids.json");

    if (!response.ok) {
        throw new Error(
            `Failed to fetch orchids. Status: ${response.status}`
        );
    }

    const data = await response.json();

    sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
            timestamp: Date.now(),
            data: data
        })
    );

    return data;
}