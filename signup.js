import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// ✅ Firebase Config Fetch Function
async function getFirebaseConfig() {
    try {
        const response = await fetch("/.netlify/functions/firebaseConfig");
        const config = await response.json();
        return config;
    } catch (error) {
        console.error("🚨 Error fetching Firebase config:", error);
        return null;
    }
}

// ✅ Initialize Firebase After Fetching Config
async function initializeFirebase() {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) {
        console.error("🚨 Firebase Config Load Failed!");
        return null;
    }
    const app = initializeApp(firebaseConfig);
    return getAuth(app);
}

// ✅ Signup Form Handling
document.addEventListener("DOMContentLoaded", async function () {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();  // ✅ Form reload hone se roko  

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorBox = document.getElementById("signup-error-message");
        const signupButton = document.getElementById("signupButton");

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
            errorBox.innerHTML = `❌ ${error.message}`;
        } finally {
            signupButton.innerHTML = "Sign Up";
            signupButton.disabled = false;
        }
    });
});
