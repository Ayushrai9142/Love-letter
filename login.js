// ✅ Firebase Config Fetch Function
async function getFirebaseConfig() {
    try {
        const response = await fetch("/.netlify/functions/firebaseConfig");
        const data = await response.json();
        console.log("✅ Firebase Config Loaded:", data.firebaseConfig);
        return data.firebaseConfig;
    } catch (error) {
        console.error("🚨 Error fetching Firebase config:", error);
        return null;
    }
}

// ✅ Initialize Firebase
async function initializeFirebase() {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) {
        console.error("🚨 Firebase Config Load Failed!");
        return null;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("✅ Firebase Initialized!");
    }
    return firebase.auth();
}

// ✅ Login Form Handling
document.addEventListener("DOMContentLoaded", async function () {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) {
        console.error("🚨 Login form not found in DOM!");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();  // ✅ Page reload hone se roko  
        console.log("✅ Login button clicked!");  // Debugging

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorBox = document.getElementById("error-message");
        const loginButton = document.querySelector("button");

        if (!email || !password) {
            errorBox.innerHTML = "⚠️ Email aur password likho!";
            return;
        }

        errorBox.innerHTML = "Logging in...";
        loginButton.innerHTML = "Logging in...";
        loginButton.disabled = true;

        try {
            const auth = await initializeFirebase();
            if (!auth) throw new Error("🚨 Firebase authentication not initialized!");

            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log("✅ Login successful!", userCredential);
            errorBox.style.color = "#28a745";
            errorBox.innerHTML = "✅ Login successful! Redirecting...";

            sessionStorage.setItem("loggedIn", "true"); // ✅ Login session store kiya
            setTimeout(() => {
                window.location.href = "index.html";  // ✅ Redirect to index page
            }, 2000);
        } catch (error) {
            console.error("🚨 Login Error:", error.message);
            errorBox.style.color = "#ff4e50";
            errorBox.innerHTML = `❌ ${error.message}`;
            loginButton.innerHTML = "Login";
            loginButton.disabled = false;
        }
    });
});
