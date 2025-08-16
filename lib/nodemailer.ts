import nodemailer from "nodemailer"
export const transporter = nodemailer.createTransport({
  service: "gmail",
   auth: {
      user: "samajseva62@gmail.com",
      pass: "osit oalc bmtg zfmm", 
    },
});