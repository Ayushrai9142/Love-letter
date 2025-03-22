// Firebase SDK ko properly import karna
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config fetch karne ka code (agar Netlify function ka use kar rahe ho)
async function getFirebaseConfig() {
    const response = await fetch("/.netlify/functions/firebaseConfig");
    const config = await response.json();
    return config;
}

getFirebaseConfig().then((firebaseConfig) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    document.getElementById('loginForm')?.addEventListener('submit', function(event) {
        event.preventDefault();  // Page reload hone se roke

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorBox = document.getElementById("error-message");
        const loginButton = document.querySelector("button");

        errorBox.innerHTML = "";
        loginButton.innerHTML = "Logging in...";
        loginButton.disabled = true;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                showSuccess("✅ Login successful! Redirecting...");
                sessionStorage.setItem("loggedIn", "true"); // ✅ Login session store kiya
                setTimeout(() => {
                    window.location.href = "index.html";  // ✅ Ab login ke baad INDEX PAGE open hoga
                }, 2000);
            })
            .catch((error) => {
                showError("❌ " + error.message);
                loginButton.innerHTML = "Login";
                loginButton.disabled = false;
            });
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
