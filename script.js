document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();  // Page reload hone se roke

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === "" || password === "") {
        showError("⚠️ Please enter both username and password!");
        return;
    }

    // Fake authentication for now (Future me backend connect hoga)
    if (username === "test" && password === "1234") {
        showSuccess("✅ Login successful! Redirecting...");
        setTimeout(() => {
            window.location.href = "payment.html"; // Payment page pe redirect
        }, 2000);
    } else {
        showError("❌ Invalid credentials! Try again.");
    }
});

// Function to show error messages
function showError(message) {
    let errorBox = document.getElementById("errorMessage");
    if (!errorBox) {
        errorBox = document.createElement("div");
        errorBox.id = "errorMessage";
        errorBox.style.color = "#ff4e50";
        errorBox.style.fontSize = "16px";
        errorBox.style.marginTop = "10px";
        document.getElementById("loginForm").appendChild(errorBox);
    }
    errorBox.innerHTML = message;
}

// Function to show success message
function showSuccess(message) {
    let successBox = document.getElementById("successMessage");
    if (!successBox) {
        successBox = document.createElement("div");
        successBox.id = "successMessage";
        successBox.style.color = "#28a745";
        successBox.style.fontSize = "16px";
        successBox.style.marginTop = "10px";
        document.getElementById("loginForm").appendChild(successBox);
    }
    successBox.innerHTML = message;
}
