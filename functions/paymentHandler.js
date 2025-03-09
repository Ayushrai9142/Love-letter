const nodemailer = require("nodemailer");
const multer = require("multer");

exports.handler = async function(event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    const formData = new URLSearchParams(event.body);
    const name = formData.get("name");
    const txn_id = formData.get("txn_id");
    const email = formData.get("email");
    const phone = formData.get("phone");

    // File upload handling (screenshot)
    const screenshot = formData.get("screenshot");

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ayushrai7533@gmail.com",  // Apna email
            pass: "Ayush@7533",   // App Password use karein
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
        `,
    };

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
