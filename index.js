import { createTransport } from 'nodemailer'
import { config, from, recipient, attachments, templatePath } from './config.js'
import { readFileSync } from 'fs'

function loadTemplate() {
    try {
        const data = readFileSync(templatePath, 'utf8')
        return data
    } catch (error) {
        console.error(error)
    }
}

async function sendMail() {
    const transporter = createTransport({
        ...config,
        tls: {
            ciphers: 'SSLv3'
        }
    });
    const info = await transporter.sendMail({
        from: from,
        to: recipient,
        subject: `Dark Mode Email Test ${Math.random().toString().substring(2, 8)}`,
        html: loadTemplate(),
        attachments: attachments
    });
    console.log(`Message sent: ${info.messageId}`);
}

sendMail()