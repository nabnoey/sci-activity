import nodemailer from "nodemailer"; 
import dotenv from "dotenv";
import { getVerificationEmailTemplate } from "./emailTemplate.js";

dotenv.config();

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if(error) console.log("SMTP Error:", error);
  else console.log("SMTP is ready!");
});


export const sendVerificationEmail = async (email, token, userName) => {
  const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${token}`;

  const mailOptions = {
    from: `"ระบบการแข่งขัน" <${process.env.EMAIL_FROM}>`, // ✅
    to: email,
    subject: "กรุณายืนยันตัวตนอีเมล",
    html: getVerificationEmailTemplate(verificationUrl, userName),
    text: `ยินดีต้อนรับสู่ระบบการแข่งขันทางวิทยาศาสตร์!\n\nเรียน คุณ${userName},\n\nขอบคุณที่ลงทะเบียนเข้าร่วมระบบการแข่งขันทางวิทยาศาสตร์ เรายินดีเป็นอย่างยิ่งที่ได้ต้อนรับคุณเข้าสู่ระบบ\n\n
กรุณายืนยันอีเมลของคุณเพื่อดำเนินการลงทะเบียนให้เสร็จสมบูรณ์และเข้าใช้งานระบบ โดยคลิกที่ลิงก์ด้านล่าง:\n\n${verificationUrl}\n\n⚠️ ลิงก์ยืนยันอีเมลนี้จะหมดอายุภายใน 24 ชั่วโมง หากคุณไม่ได้ลงทะเบียนในระบบนี้ กรุณาเพิกเฉยต่ออีเมลนี้
\n\nขอแสดงความนับถือ,\nทีมงานระบบการแข่งขันทางวิทยาศาสตร์`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
