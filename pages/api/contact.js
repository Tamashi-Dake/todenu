const nodemailer = require("nodemailer");

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // Validate the input fields
    if (!data.name || !data.email || !data.message) {
      return res
        .status(400)
        .json({ error: "Bad request, Please fill in all fields" });
    }

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Contact Form Submission",
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
