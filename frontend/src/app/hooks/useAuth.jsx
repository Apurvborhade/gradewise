import { useEffect, useState } from "react";
import { auth } from "@/app/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup
    }, []);

    return { user, loading };
}
