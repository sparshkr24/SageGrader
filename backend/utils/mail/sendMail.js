const transporter = require("./SMTPconfig.js"); 

const mailOptions = {
  from: "sparsh24112002@gmail.com",
  to: "20bcs219@iiitdmj.ac.in",
  subject: "Hello from Node.js",
  text: "This is a test email from Node.js",
};

const sendMail = ()=>{
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email: " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
} 
sendMail();

