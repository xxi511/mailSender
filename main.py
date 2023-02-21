from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
import smtplib
import random
import string
import config

if __name__ == '__main__':
    server = smtplib.SMTP('smtp.gmail.com')
    server.starttls()
    server.login(config.account, config.applicationPassword)

    body = Path(config.templateName).read_text()
    for i in range(config.numOfMessages):
        content = MIMEMultipart()  
        randomStr = ''.join(random.choice(string.ascii_letters) for x in range(10))
        content["subject"] = "{} th - {}".format(i, randomStr)
        content["from"] = config.account
        content["to"] = config.receiver
        content.attach(MIMEText(body, "html"))
        server.sendmail(config.account, config.receiver, content.as_string())
        print("Send {} th message".format(i))
    server.quit()
    print("All messages are sent")