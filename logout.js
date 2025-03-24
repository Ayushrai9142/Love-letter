import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// ✅ Firebase Initialization
async function initializeFirebase() {
    const response = await fetch("/.netlify/functions/firebaseConfig");
    const { firebaseConfig } = await response.json();
    const app = initializeApp(firebaseConfig);
    return getAuth(app);
}

// ✅ Logout Function
async function handleLogout() {
    try {
        const auth = await initializeFirebase();
        await signOut(auth);

        // ✅ Session Storage & Local Storage Clear
        sessionStorage.clear();
        localStorage.clear();

        console.log("✅ User logged out successfully!");
        
        // ✅ Redirect to Login Page
        window.location.href = "login.html";
    } catch (error) {
        console.error("🚨 Logout Error:", error.message);
    }
}

// ✅ Logout Button Event Listener
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }
});
