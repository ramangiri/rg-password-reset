const randomString = require("random-string");
const nodemailer = require("nodemailer");
const verificationString = randomString({ length: 50 });

//const password = process.env.emailPass;

const auth = async (emailaddress) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      tls: {
        
        rejectUnauthorized: false
      },
      auth: {
        user : process.env.EMAIL_USERNAME,
        pass : process.env.EMAIL_PASSWORD
      },
    });
    console.log(verificationString);
    await transporter.sendMail({
      from: '"Password_Reset link from RamanGiri  😊" <process.env.EMAIL_USERNAME>',
      to: emailaddress,
      subject: "Password Reset",
      html: `<div style="margin : 0 auto; width: 450px; border:1px solid lightgray; border-radius:5px; padding:1rem; text-align:center;">
      <h1 style="font-size:1rem; color:salmon; text-align: left;"> <lead>Dear user,</lead> <br/> <br/>if you have requested for a new password. Please verify this email to reset the password or simply ignore this email.</h1>
      <div style="padding:1rem; margin:0.75rem auto; width:400px; height: 300px;">
      <a href="${process.env.CLIENT_SERVER}/reset-password/${verificationString}">
        <img src="https://thumbs.dreamstime.com/b/forgot-password-lock-keyboard-combination-gray-computer-158933051.jpg" style="width:100%; height:100%; text-decoration:none; cursor: pointer;" alt="recover-password">
      </a>
        </div>
      <a href="${process.env.CLIENT_SERVER}/reset-password/${verificationString}" style="font-size: 1rem; padding:0.75rem; border:none; border-radius:5px; text-decoration:none; background-color: rgb(76, 175, 75); color: whitesmoke; cursor:pointer;">Reset Now</a>
      </div>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { auth, verificationString };
