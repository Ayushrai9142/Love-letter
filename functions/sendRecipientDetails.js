const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const formData = JSON.parse(event.body);
        const { sender, recipient, message } = formData; // ✅ Custom Message ko extract kiya

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ayushrai7533@gmail.com",
                pass: "byiz iotv jjjr vzzy" // ⚠️ App Password ka dhyan rakhna
            }
        });

        let mailOptions = {
            from: "ayushrai7533@gmail.com",
            to: "ayushrai7533@gmail.com",
            subject: "New Recipient Details",
            text: `💌 **New Love Letter Request** 💌\n\n
            📌 **Sender:** ${sender || "Not Provided"}\n
            📌 **Recipient:** ${recipient || "Not Provided"}\n
            💬 **Custom Message:** ${message && message.trim() !== "" ? message : "No custom message provided."}`
        };

        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: JSON.stringify({ message: "Recipient details sent successfully!" }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
    }
};
