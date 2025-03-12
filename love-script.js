document.addEventListener("DOMContentLoaded", function() {
    // Retrieve sender, recipient names & custom message from URL
    const urlParams = new URLSearchParams(window.location.search);

    const senderName = urlParams.get("sender") || "Someone";
    const recipientName = urlParams.get("recipient") || "Dear";
    const customMessage = urlParams.get("message") ? decodeURIComponent(urlParams.get("message")) : "";

    // Update button text
    const revealButton = document.getElementById("revealButton");
    revealButton.textContent = `💖 Reveal ${senderName}'s Heart 💖`;

    // Update heading & "Dear" text
    document.getElementById("dearText").textContent = `Dear ${recipientName},`;

    // Reveal message when button is clicked
    const secretElement = document.getElementById("secret");
    revealButton.addEventListener("click", function() {
        if (customMessage && customMessage.trim() !== "") {
            // Agar user ne custom message diya hai, toh wahi show hoga
            secretElement.innerHTML = `${recipientName}, ${customMessage}`;
        } else {
            // Default message agar custom message nahi diya gaya hai
            secretElement.innerHTML = `${recipientName}, you are the most beautiful part of my life. Without you, everything feels incomplete. ❤️<br><br>
            You don't know how much I love you, just like a cherry on top of a cake! 🍒`;
        }
        
        secretElement.style.opacity = "1"; // Show message
        revealButton.style.display = "none"; // Hide button

        // Redirect after 8 seconds
        setTimeout(() => {
            window.location.href = "index.html";
        }, 8000);
    });

    // Disable right-click
    document.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener("keydown", function(event) {
        if (
            event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
            (event.ctrlKey && event.key === "U")
        ) {
            event.preventDefault();
        }
    });

    // Screenshot Prevention (Black Screen Trick)
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            document.body.innerHTML = "<div style='background:black;width:100vw;height:100vh;position:fixed;top:0;left:0;z-index:9999;'></div>";
        }
    });
});
