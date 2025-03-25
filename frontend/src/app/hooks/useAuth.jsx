import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import { auth } from "../lib/firebaseClient";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token`, { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch token");

                const { user } = await response.json();

                if (!user) {
                    setUser(null);
                    setLoading(false);
                    return;
                }


                setUser(user);
            } catch (error) {
                console.error("Error decoding token:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    return { user, loading };
};

export default useAuth;
