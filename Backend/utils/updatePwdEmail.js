const nodemailer = require("nodemailer");
const {HTML_TEMPLATEPWD } = require("./HTMLTEMPLATEPWD");

const updatePwdEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text:text,
      html: HTML_TEMPLATEPWD(text),
    });
    
    console.log("email sent sucessfully");
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

module.exports = updatePwdEmail;
