const nodemailer = require("nodemailer");

exports.handler = async function(event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    try {
        // Parse form data from JSON
        const formData = JSON.parse(event.body);
        const { name, txn_id, email, phone, screenshot } = formData;

        // Nodemailer setup
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ayushrai7533@gmail.com",  // ✅ Apna email yahan dalna
                pass: "0nUlK7p0%uau-4Aq",  // ❌ Real password mat likho, "App Password" generate karo
            },
        });

        let mailOptions = {
            from: "ayushrai7533@gmail.com",
            to: "ayushrai7533@gmail.com",  
            subject: "New Payment Received",
            text: `Payment Details:
                Name: ${name}
                Transaction ID: ${txn_id}
                Email: ${email}
                Phone: ${phone}
                Screenshot: ${screenshot ? "Yes" : "No file uploaded"}
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Payment details received!" }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to process request.", error }),
        };
    }
};
