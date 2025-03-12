document.addEventListener("DOMContentLoaded", function() {
    // Retrieve stored sender's and recipient's names
    const urlParams = new URLSearchParams(window.location.search);
    const senderName = urlParams.get("sender") || "Someone";
    const recipientName = urlParams.get("recipient") || "Dear";

    // Update the button text dynamically
    const revealButton = document.getElementById("revealButton");
    revealButton.textContent = `💖 Reveal ${senderName}'s Heart 💖`;

    // Reveal message when the button is clicked
    const secretElement = document.getElementById("secret");
    revealButton.addEventListener("click", function() {
        secretElement.innerHTML = `${recipientName}, you are the most beautiful part of my life. Without you, everything feels incomplete. ❤️<br><br>
        You don't know how much I love you, just like a cherry on top of a cake! 🍒`;
        secretElement.style.opacity = "1"; // Message visible hoga
        revealButton.style.display = "none"; // Button hide hoga
    });
});
