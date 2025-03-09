// paymentHandler.js
const nodemailer = require("nodemailer");

exports.handler = async function(event, context) {
    try {
        // Parse the incoming request body
        const { name, txn_id, email, phone, screenshot } = JSON.parse(event.body);

        // Set up nodemailer transporter with environment variables
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,  // Get email from environment variable
                pass: process.env.MAIL_PASS,  // Get password from environment variable
            },
        });

        // Email content
        let mailOptions = {
            from: process.env.MAIL_USER,  // From your email
            to: "ayushrai7533@gmail.com",     // To your email
            subject: "New Payment Received",
            text: `Payment Details:
                Name: ${name}
                Transaction ID: ${txn_id}
                Email: ${email}
                Phone: ${phone}
                Screenshot URL: ${screenshot ? screenshot : "No screenshot uploaded"}
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Payment details received and email sent!",
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to process payment details or send email.",
                error: error.message,
            }),
        };
    }
};
