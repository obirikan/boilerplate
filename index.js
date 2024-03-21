const nodemailer = require('nodemailer');

//nodemailer config
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, 
  }
});

// Function to send email
const sendEmail = async (emailOptions) => {
  try {
    let info = await transporter.sendMail(emailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

app.post('/send-email', async (req, res) => {
  const {text,subject,to,username,data } = req.body;

  try {
    const emailOptions = {
      from:"MigranX",
      to: to,
      subject:subject,
      text: text,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Email Template</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }

            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h1 {
              color: #334;
            }

            p {
              color: #666;
            }

            a {
              color: #007bff;
              text-decoration: none;
            }

            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Order From ${username}</h1>
            <p>Hello,Admin</p>
            <p>these items have been ordered by ${username}</p>
            <p><b>${data}</b></p>
            <p> please check it out to assign it to a driver</p>
            <p>Best regards,<br>Team MigranX</p>
          </div>
        </body>
        </html>
      `,
    };

    const info = await sendEmail(emailOptions);
    res.status(200).json({ message: 'Email sent successfully', info: info });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error });
  }
});
