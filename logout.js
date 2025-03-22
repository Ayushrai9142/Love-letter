import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// ✅ Firebase Initialize Karna
async function initializeFirebase() {
    const response = await fetch("/.netlify/functions/firebaseConfig");
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    return getAuth(app);
}

// ✅ Logout Button Click Event
document.addEventListener("DOMContentLoaded", async function () {
    const logoutButton = document.getElementById("logoutButton");
    if (!logoutButton) return;

    logoutButton.addEventListener("click", async function () {
        const auth = await initializeFirebase();
        signOut(auth)
            .then(() => {
                sessionStorage.removeItem("loggedIn"); // ✅ Login session remove karein
                window.location.href = "login.html"; // ✅ Redirect to login page
            })
            .catch((error) => {
                console.error("🚨 Logout Error:", error.message);
            });
    });
});
