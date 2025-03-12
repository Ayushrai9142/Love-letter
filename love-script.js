document.addEventListener("DOMContentLoaded", function() {
    // Get sender and recipient names from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sender = urlParams.get("sender") || "Someone Special";
    const recipient = urlParams.get("recipient") || "Dear";

    // Set dynamic values
    document.title = sender + "'s Love Letter";
    document.querySelector(".title").textContent = sender + "'s Love Letter";
    document.getElementById("dear").textContent = `Dear ${recipient},`;

    // Reveal secret message
    const revealButton = document.getElementById("revealButton");
    const secretElement = document.getElementById("secret");

    revealButton.addEventListener("click", function() {
        secretElement.innerHTML = "You don't follow me, you follow my heart! ❤️<br> You don't know how much I love you! Just like a cherry on top of a cake, you make my life complete! 🍒";
        secretElement.style.opacity = "1"; // Show message
        revealButton.style.display = "none"; // Hide button
    });
});

