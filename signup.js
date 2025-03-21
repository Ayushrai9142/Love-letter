import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// ✅ Firebase Config Fetch Function
async function getFirebaseConfig() {
    try {
        const response = await fetch("/.netlify/functions/firebaseConfig");
        const config = await response.json();
        return config;
    } catch (error) {
        console.error("Error fetching Firebase config:", error);
        return null;
    }
}

// ✅ Initialize Firebase After Fetching Config
async function initializeFirebase() {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) {
        console.error("Firebase Config Load Failed!");
        return;
    }
    const app = initializeApp(firebaseConfig);
    return getAuth(app);
}

// ✅ Signup Form Handling
document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Form submit hone se roke

    console.log("Signup button clicked!"); // ✅ Debug message

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("signup-error-message");

    if (!email || !password) {
        errorBox.innerHTML = "⚠️ Email aur password likho!";
        return;
    }

    errorBox.innerHTML = "Creating account...";

    try {
        const auth = await initializeFirebase();
        if (!auth) {
            throw new Error("Firebase authentication not initialized!");
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signup successful!", userCredential); // ✅ Debug message
        errorBox.style.color = "#28a745";
        errorBox.innerHTML = "✅ Account created successfully! Redirecting...";
        setTimeout(() => {
            window.location.href = "login.html"; // Login page pe redirect
        }, 2000);
    } catch (error) {
        console.error("Signup Error:", error.message); // ✅ Debug error log
        errorBox.style.color = "#ff4e50";
        errorBox.innerHTML = `❌ ${error.message}`;
    }
});
