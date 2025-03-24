// ✅ Firebase SDK Import
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ✅ Firebase Config Fetch Function
async function getFirebaseConfig() {
    try {
        const response = await fetch("/.netlify/functions/firebaseConfig");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const { firebaseConfig } = await response.json();
        return firebaseConfig;
    } catch (error) {
        console.error("🚨 Error fetching Firebase config:", error);
        return null;
    }
}

// ✅ Firebase Initialization Function
async function initializeFirebase() {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        console.error("🚨 Firebase Config Load Failed! API key missing.");
        return null;
    }

    let app;
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }

    return getAuth(app);
}

// ✅ Function to Convert Firebase Errors to Custom Messages
function getCustomErrorMessage(errorCode) {
    const errorMessages = {
        "auth/user-not-found": "⚠️ No account found with this email. Sign up first!",
        "auth/wrong-password": "⚠️ Incorrect password! Try again.",
        "auth/invalid-email": "⚠️ Please enter a valid email address!",
        "auth/user-disabled": "⚠️ This account has been disabled!",
        "auth/missing-password": "⚠️ Please enter your password!",
        "auth/network-request-failed": "⚠️ Network error! Check your internet connection.",
        "auth/too-many-requests": "⚠️ Too many failed attempts. Try again later!",
        "auth/internal-error": "⚠️ Something went wrong on the server. Try again later!",
        "auth/invalid-login-credentials": "⚠️ Invalid email or password. Please try again!",
        "auth/weak-password": "⚠️ Password should be at least 6 characters long!"
    };

    return errorMessages[errorCode] || "⚠️ Something went wrong. Please try again.";
}

// ✅ Login Form Handling
document.addEventListener("DOMContentLoaded", async function () {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const auth = await initializeFirebase();
    if (!auth) {
        console.error("🚨 Firebase Auth not initialized!");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorBox = document.getElementById("error-message");
        const loginButton = event.target.querySelector("button");

        if (!email || !password) {
            errorBox.innerHTML = "⚠️ Email aur password likho!";
            return;
        }

        errorBox.innerHTML = "Logging in...";
        errorBox.style.color = "#000";
        loginButton.innerHTML = "Logging in...";
        loginButton.disabled = true;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Login successful!", userCredential);

            errorBox.style.color = "#28a745";
            errorBox.innerHTML = "✅ Login successful! Redirecting...";

            sessionStorage.setItem("loggedIn", "true");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } catch (error) {
            console.error("🚨 Login Error:", error.code);  // 🔍 Debugging ke liye error print

            const errorMessage = getCustomErrorMessage(error.code);
            errorBox.style.color = "#ff4e50";
            errorBox.innerHTML = `❌ ${errorMessage}`;
        } finally {
            loginButton.innerHTML = "Login";
            loginButton.disabled = false;
        }
    });
});
