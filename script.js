document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();  // Page reload hone se roke

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorBox = document.getElementById("errorMessage");
    const loginButton = document.querySelector("button");

    errorBox.innerHTML = "";
    loginButton.innerHTML = "Logging in...";
    loginButton.disabled = true;

    setTimeout(() => {
        if (username === "" || password === "") {
            showError("⚠️ Please enter both username and password!");
        } else if (username === "Ayush123" && password === "9142") {
            showSuccess("✅ Login successful! Redirecting...");
            localStorage.setItem("isLoggedIn", "true"); // ✅ Login session save karna
            setTimeout(() => {
                window.location.href = "index.html";  // ✅ Login ke baad INDEX page khulega
            }, 2000);
        } else {
            showError("❌ Invalid username or password! Try again.");
        }
        loginButton.innerHTML = "Login";
        loginButton.disabled = false;
    }, 1500);
});

// ✅ Function to show error messages
function showError(message) {
    const errorBox = document.getElementById("errorMessage");
    errorBox.innerHTML = message;
    errorBox.style.color = "#ff4e50";
    errorBox.style.fontSize = "16px";
}

// ✅ Function to show success message
function showSuccess(message) {
    const errorBox = document.getElementById("errorMessage");
    errorBox.innerHTML = message;
    errorBox.style.color = "#28a745";
    errorBox.style.fontSize = "16px";
}
