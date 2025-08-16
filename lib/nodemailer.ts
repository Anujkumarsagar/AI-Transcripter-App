import nodemailer from "nodemailer"
export const transporter = nodemailer.createTransport({
  service: "email",
   auth: {
      user: "samajseva62@gmail.com",
      pass: "osit oalc bmtg zfmm", 
    },
});