import jwt from "jsonwebtoken";
import db from "../models/index.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../utils/email.js";

const User = db.User;
const VerificationToken = db.VerificationToken;

// Register
const signUp = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;

  try {
    // 1) Check required fields
    if (!email || !password || !type || !name) {
      return res.status(400).send({
        message: "Email, password, type, and name are required!",
      });
    }

    // 2) Check allowed types
    const allowType = ["admin", "teacher", "judge"];
    if (!allowType.includes(type)) {
      return res.status(400).send({
        message: "Invalid user type. Must be admin, teacher, or judge",
      });
    }

    // 3) Teacher must have school + phone
    if (type === "teacher" && (!school || !phone)) {
      return res
        .status(400)
        .send({ message: "School and phone are required for teacher!" });
    }

    // 4) Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: "Email already in use!" });
    }

    // 5) Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // 6) Prepare user data
    const userData = { name, email, password: hashedPassword, type };
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    // 7) Create user
    const user = await User.create(userData);

    // 8) Teacher → create verification token + send email (catch error แต่ไม่ crash)
    if (type === "teacher") {
      try {
        const token = crypto.randomBytes(32).toString("hex");

        const verification = await VerificationToken.create({
          token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
        });

        console.log("Verification token created:", verification.token);

        await sendVerificationEmail(user.email, token, user.name);
        console.log("Verification email sent successfully");
      } catch (emailError) {
        console.error("Error sending verification email:", emailError);
        // ไม่ส่ง 500 → user สร้างแล้ว แต่เมลอาจ fail
      }
    }

    // 9) Response
    res.status(201).send({
      message:
        user.type === "teacher"
          ? "Registration successful! Please check your email to verify your account."
          : "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
    });
  } catch (error) {
    console.error("Error in signUp:", error.stack || error);
    res.status(500).send({ message: "Some error occurred" });
  }
};

const authController = {
  signUp,
  // signIn สามารถเพิ่มตรงนี้ได้
};

export default authController;
