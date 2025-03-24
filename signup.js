// ✅ Firebase SDK Import
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// ✅ Initialize Firebase After Fetching Config
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
        "auth/email-already-in-use": "⚠️ This email is already registered. Try logging in!",
        "auth/weak-password": "⚠️ Password must be at least 6 characters!",
        "auth/invalid-email": "⚠️ Please enter a valid email address!",
        "auth/network-request-failed": "⚠️ Network error! Check your internet connection.",
        "auth/internal-error": "⚠️ An unexpected error occurred. Try again later."
    };
    return errorMessages[errorCode] || "⚠️ Something went wrong! Try again.";
}

// ✅ Signup Form Handling
document.addEventListener("DOMContentLoaded", async function () {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorBox = document.getElementById("signup-error-message");
        const signupButton = event.target.querySelector("button");

        if (!email || !password) {
            errorBox.innerHTML = "⚠️ Email aur password likho!";
            return;
        }

        errorBox.innerHTML = "Creating account...";
        errorBox.style.color = "#000";
        signupButton.innerHTML = "Signing Up...";
        signupButton.disabled = true;

        try {
            const auth = await initializeFirebase();
            if (!auth) {
                throw new Error("🚨 Firebase authentication not initialized!");
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("✅ Signup successful!", userCredential);
            errorBox.style.color = "#28a745";
            errorBox.innerHTML = "✅ Account created successfully! Redirecting...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } catch (error) {
            console.error("🚨 Signup Error:", error.message);
            errorBox.style.color = "#ff4e50";
            errorBox.innerHTML = `❌ ${getCustomErrorMessage(error.code)}`;
        } finally {
            signupButton.innerHTML = "Sign Up";
            signupButton.disabled = false;
        }
    });
});
