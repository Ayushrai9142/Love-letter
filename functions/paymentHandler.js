const nodemailer = require("nodemailer");

exports.handler = async function(event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    try {
        // Parse JSON Data
        const formData = JSON.parse(event.body);
        const { name, txn_id, email, phone, sender, recipient, message } = formData;

        // Nodemailer Setup
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ayushrai@gmail.com",  
                pass: "byiz iopt ceyr vzzy",  // ⚠ Use App Password Here
            },
        });

        let mailOptions = {
            from: "ayushrai@gmail.com",
            to: "ayushrai@gmail.com",  
            subject: "New Payment Received 💰",
            text: `🎉 You have received a new payment! 🎉\n\n
            🛒 **Payment Details:**\n
            - Name: ${name}
            - Transaction ID: ${txn_id}
            - Email: ${email}
            - Phone: ${phone}\n\n
            💌 **Love Letter Details:**\n
            - Sender: ${sender || "Unknown"}
            - Recipient: ${recipient || "Not Provided"}
            - Custom Message: ${message || "No custom message provided."}\n\n
            ✅ Please verify the payment and generate the love letter link.\n
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Payment details received successfully!" }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to process request.", error }),
        };
    }
};
