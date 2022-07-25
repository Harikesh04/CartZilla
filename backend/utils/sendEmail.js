import nodeMailer from "nodemailer";

const sendEmail = async (options) => {

  const transporter = nodeMailer.createTransport({
    // host:process.env.SMPT_HOST,
    // port:process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,//this will tell which type , gmail,hotmail,email etc.
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions ={
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
export default sendEmail;
 