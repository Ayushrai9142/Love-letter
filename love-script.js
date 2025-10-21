document.addEventListener("DOMContentLoaded", async function () {
    // ✅ Firebase Authentication Check
    await checkAuth();

    // ✅ Fix: URL se custom message bhi lena
    const urlParams = new URLSearchParams(window.location.search);
    const senderName = urlParams.get("sender") || "Someone";
    const recipientName = urlParams.get("recipient") || "Dear";
    const customMessage = urlParams.get("message") ? decodeURIComponent(urlParams.get("message")) : "";

    // Button text update
    const revealButton = document.getElementById("revealButton");
    revealButton.textContent = `💖 Reveal ${senderName}'s Heart 💖`;

    // Heading & "Dear" text update
    document.getElementById("dearText").textContent = `Dear ${recipientName},`;

    // ✅ Fix: Custom message ko properly set karna
    const secretElement = document.getElementById("secret");
    revealButton.addEventListener("click", function () {
        if (customMessage && customMessage.trim() !== "") {
            secretElement.innerHTML = `${recipientName}, ${customMessage}`; // ✅ Custom message show karega
        } else {
            secretElement.innerHTML = `${recipientName}, you are the most beautiful part of my life. Without you, everything feels incomplete. ❤️<br><br>
            You don't know how much I love you, just like a cherry on top of a cake! 🍒`;
        }

        secretElement.style.opacity = "1"; // Show message
        revealButton.style.display = "none"; // Hide button

        // Redirect after 60 seconds
        setTimeout(() => {
            window.location.href = "index.html";
        }, 60000);
    });

    // Disable right-click
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener("keydown", function (event) {
        if (
            event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
            (event.ctrlKey && event.key === "U")
        ) {
            event.preventDefault();
        }
    });

    // Screenshot Prevention (Black Screen Trick)
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            document.body.innerHTML = "<div style='background:black;width:100vw;height:100vh;position:fixed;top:0;left:0;z-index:9999;'></div>";
        }
    });
});

// ✅ Firebase Authentication Check Function
async function checkAuth() {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js");
    const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js");

    const response = await fetch("/.netlify/functions/firebaseConfig");
    const { firebaseConfig } = await response.json();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = "login.html"; // Redirect to login if not authenticated
            } else {
                resolve();
            }
        });
    });
}
