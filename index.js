import { createTransport } from 'nodemailer'
import { config, from, recipient, attachments, templatePath, numOfMessage } from './config.js'
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
    for (let i = 0; i < numOfMessage; i++) {
        const info = await transporter.sendMail({
            from: from,
            to: recipient,
            subject: `${i}th ${Math.random().toString().substring(2, 8)}`,
            html: loadTemplate(),
            attachments: attachments
        });
        console.log(`${i} Message sent: ${info.messageId}`);
    }
    
}

sendMail()