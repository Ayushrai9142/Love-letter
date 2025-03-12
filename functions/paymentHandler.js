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
        const { name, txn_id, email, phone } = formData;

        // Nodemailer Setup
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ayushrai7533@gmail.com",  
                pass: "byiz iopt ceyr vzzy",  // ⚠ Use App Password Here
            },
        });

        let mailOptions = {
            from: "ayushrai7533@gmail.com",
            to: "ayushrai7533@gmail.com",  
            subject: "New Payment Received",
            text: `Payment Details:\n
                Name: ${name}
                Transaction ID: ${txn_id}
                Email: ${email}
                Phone: ${phone}
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
