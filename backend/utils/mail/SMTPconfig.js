const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: "sparsh24112002@gmail.com",
    pass: "grek mxnz gkfx jguk", 
  },
});

module.exports = transporter;