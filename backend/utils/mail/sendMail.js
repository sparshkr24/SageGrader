const transporter = require("./SMTPconfig");

const sendMail = (data) => {
  const mailOptions = {
    from: "sparsh24112002@gmail.com",
    to: data.to,
    subject: data.subject,
    text: data.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;

// const emailData = {
//   to: "20bcs219@iiitdmj.ac.in",
//   subject: "Hello from Node.js",
//   text: "This is a test email from Node.js",
// };

// sendMail(emailData);
