const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            secure: true,
            auth: {
                user: process.env.ADMIN,
                pass: process.env.PASS,
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        await transporter.sendMail({
            from: process.env.ADMIN,
            to: email,
            subject: subject,
            text: text,
        });
        console.log('Resultat :' + transporter)
        console.log("email sent sucessfully");
    } catch (error) {
        
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;