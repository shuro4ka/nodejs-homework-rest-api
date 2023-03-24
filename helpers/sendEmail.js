
const nodemailer = require('nodemailer');

require('dotenv').config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'zzlesia77@meta.ua',
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);


const sendEmail = async (data) => {
    const email = {...data, from: "zzlesia77@meta.ua"};
    await transporter.sendMail(email);  
};

module.exports = sendEmail;






// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const {SENDGRID_API_KEY} = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//     const email = {...data, from: "zzlesia77@gmail.com"};
//     await sgMail.send(email);
//     return true;
// }

// module.exports = sendEmail;