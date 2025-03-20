import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./firebase-config.js";
import { initializeApp } from "firebase/app";

// Firebase initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Form submit hone se roke

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("signup-error-message");

    errorBox.innerHTML = "Creating account...";
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            errorBox.style.color = "#28a745";
            errorBox.innerHTML = "✅ Account created successfully! Redirecting...";
            setTimeout(() => {
                window.location.href = "login.html"; // Login page pe redirect
            }, 2000);
        })
        .catch((error) => {
            errorBox.style.color = "#ff4e50";
            errorBox.innerHTML = `❌ ${error.message}`;
        });
});
