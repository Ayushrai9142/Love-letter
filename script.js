document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();  // Page reload hone se roke

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorBox = document.getElementById("error-message");
    const loginButton = document.querySelector("button");

    errorBox.innerHTML = "";
    loginButton.innerHTML = "Logging in...";
    loginButton.disabled = true;

    setTimeout(() => {
        if (username === "" || password === "") {
            showError("⚠️ Please enter both username and password!");
        } else if (username === " " && password === " ") {
            showSuccess("✅ Login successful! Redirecting...");
            sessionStorage.setItem("loggedIn", "true"); // ✅ Login session store kiya
            setTimeout(() => {
                window.location.href = "index.html";  // ✅ Ab login ke baad INDEX PAGE open hoga
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
