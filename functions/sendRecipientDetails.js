const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const formData = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ayushrai7533@gmail.com",
                pass: "byiz iopt ceyr vzzy"
            }
        });

        let mailOptions = {
            from: "ayushrai7533@gmail.com",
            to: "ayushrai7533@gmail.com",
            subject: "New Recipient Details",
            text: `Sender: ${formData.sender}\nRecipient: ${formData.recipient}\nCustom Message: ${formData.message || "No custom message provided."}`
        };

        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: JSON.stringify({ message: "Email Sent" }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
    }
};
