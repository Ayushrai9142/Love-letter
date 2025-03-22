import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// ✅ Firebase Initialize Karna (Ek hi baar call hoga)
let auth = null;
async function initializeFirebase() {
    if (auth) return auth; // Agar already initialized hai toh wahi return karega
    try {
        const response = await fetch("/.netlify/functions/firebaseConfig");
        const firebaseConfig = await response.json();
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        console.log("✅ Firebase Initialized for Logout!"); // Debugging ke liye
        return auth;
    } catch (error) {
        console.error("🚨 Firebase Initialization Failed:", error);
        return null;
    }
}

// ✅ Logout Button Click Event
document.addEventListener("DOMContentLoaded", async function () {
    const logoutButton = document.getElementById("logoutButton");
    if (!logoutButton) return; // Agar button nahi mila toh kuch mat karo

    logoutButton.addEventListener("click", async function () {
        console.log("✅ Logout button clicked!"); // Debugging ke liye

        const authInstance = await initializeFirebase();
        if (!authInstance) {
            console.error("🚨 Firebase not initialized, cannot log out.");
            return;
        }

        signOut(authInstance)
            .then(() => {
                sessionStorage.removeItem("loggedIn"); // ✅ Login session remove karein
                console.log("✅ User logged out successfully!");
                window.location.href = "login.html"; // ✅ Redirect to login page
            })
            .catch((error) => {
                console.error("🚨 Logout Error:", error.message);
            });
    });
});
