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
        "auth/network-request-failed": "⚠️ Network error! Check your internet connection."
    };
    return errorMessages[errorCode] || "⚠️ Something went wrong! Try again.";
}

// ✅ Login Form Handling
document.addEventListener("DOMContentLoaded", async function () {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const auth = await initializeFirebase(); // 🔥 Firebase Init (Ab auth null nahi hoga)
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

            sessionStorage.setItem("loggedIn", "true"); // ✅ Login session store
            setTimeout(() => {
                window.location.href = "index.html";  // ✅ Login ke baad index.html open hoga
            }, 2000);
        } catch (error) {
            console.error("🚨 Login Error:", error.message);
            errorBox.style.color = "#ff4e50";
            errorBox.innerHTML = `❌ ${getCustomErrorMessage(error.code)}`;
        } finally {
            loginButton.innerHTML = "Login";
            loginButton.disabled = false;
        }
    });
});
