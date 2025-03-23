// ✅ Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ✅ Firebase Config Fetch Function
async function getFirebaseConfig() {
    try {
        const response = await fetch("/.netlify/functions/firebaseConfig");
        const config = await response.json();
        console.log("🔍 Debug: Firebase Config Test:", config);

        if (!config || !config.apiKey) {
            throw new Error("🚨 Invalid Firebase Config! API Key not found.");
        }
        return config;
    } catch (error) {
        console.error("🚨 Firebase Config Fetch Error:", error);
        return null;
    }
}

// ✅ Initialize Firebase
async function initializeFirebase() {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) {
        console.error("🚨 Firebase Initialization Failed! Check Config.");
        return null;
    }
    const app = initializeApp(firebaseConfig);
    return getAuth(app);
}

// ✅ Login Form Handling
document.addEventListener("DOMContentLoaded", async function () {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) {
        console.error("🚨 Login form not found in DOM!");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // ✅ Page reload hone se roke
        console.log("✅ Login button clicked!"); // Debugging

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorBox = document.getElementById("error-message");
        const loginButton = document.querySelector("button");

        if (!email || !password) {
            showError("⚠️ Email aur password likho!");
            return;
        }

        errorBox.innerHTML = "Logging in...";
        loginButton.innerHTML = "Logging in...";
        loginButton.disabled = true;

        try {
            const auth = await initializeFirebase();
            if (!auth) {
                throw new Error("🚨 Firebase Auth not initialized!");
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Login successful!", userCredential);

            showSuccess("✅ Login successful! Redirecting...");
            sessionStorage.setItem("loggedIn", "true");

            setTimeout(() => {
                window.location.href = "index.html"; // ✅ Redirect to home
            }, 2000);
        } catch (error) {
            console.error("🚨 Login Error:", error.message);
            showError(`❌ ${error.message}`);
            loginButton.innerHTML = "Login";
            loginButton.disabled = false;
        }
    });

    // ✅ Function to show error messages
    function showError(message) {
        const errorBox = document.getElementById("error-message");
        errorBox.innerHTML = message;
        errorBox.style.color = "#ff4e50";
        errorBox.style.fontSize = "16px";
    }

    // ✅ Function to show success message
    function showSuccess(message) {
        const errorBox = document.getElementById("error-message");
        errorBox.innerHTML = message;
        errorBox.style.color = "#28a745";
        errorBox.style.fontSize = "16px";
    }
});
