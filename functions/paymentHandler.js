// paymentHandler.js
const nodemailer = require("nodemailer");

exports.handler = async function(event, context) {
    const { name, txn_id, screenshot, email, phone } = JSON.parse(event.body);

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-ayushrai7533@gmail.com",  // Apna email address yahan dalna
            pass: "Ayush@7533",   // Apna email password yahan dalna
        },
    });

    // Email content
    let mailOptions = {
        from: "your-ayushrai7533@gmail.com",
        to: "ayushrai7533@gmail.com",  // Tumhare email par yeh bhejna
        subject: "New Payment Received",
        text: `Payment Details:
            Name: ${name}
            Transaction ID: ${txn_id}
            Email: ${email}
            Phone: ${phone}
            Screenshot URL: ${screenshot}
        `,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Payment details received!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send email.", error }),
        };
    }
};
