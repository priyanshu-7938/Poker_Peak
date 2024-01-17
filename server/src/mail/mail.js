import sgMail from '@sendgrid/mail';
import User from '../models/user.js';



//updated content goes here....
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.net",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_EMAIL,
//     pass: process.env.APP_PASSWORD,
//     method: "PLAIN", // Explicitly set the authentication method
//   },
// });

const mailOption = {
  from: process.env.MA,
  to: "dreia848@gmail.com",//mail goes here
  subject: "helo",
  text: "this is a text",
  html: "<p>heml goes here</p>",
}
const sendMail = async (mailOption, transporter ) => {
  console.log(process.env.MAIL_EMAIL,process.env.APP_PASSWORD);
  await transporter.sendMail(mailOption,( error, info )=>{
    if(error){
      return console.log(error);
    }
    console.log("Email sent.",info);
  });
}
async function WelcomeMail(){
  sendMail(mailOption, transporter);
}
export default WelcomeMail;

