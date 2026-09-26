import { useCallback, useEffect, useState } from "react";
import { getOrchids } from "../api/orchidService";

function useOrchids() {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadOrchids = useCallback(async (forceReload = false) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getOrchids(forceReload);

            setOrchids(data);
        } catch (err) {
            console.error(err);

            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrchids(false);
    }, [loadOrchids]);

    const reload = () => {
        loadOrchids(true);
    };

    return {
        orchids,
        loading,
        error,
        reload
    };
}

export default useOrchids;