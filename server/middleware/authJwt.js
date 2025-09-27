import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.User;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No Token Provided!" });
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  try{
    User.findByPk(req.userId).then((user) => {
    if(!user){
      return res.status(404).send({ message:"User not found!"});
    }
    //เช็คว่าเป็น admin ไหม
    if(user.type === "admin"){
      next();
      return;
    }
    return  res.status(401).send({message:"Unauthorized access, require admin roles"})
  });
  } catch (error){
    return res.status(500).send({message:error.message})
  }
};

const isTeacher = (req, res, next) => {
  try {
    User.findByPk(req.userId).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      //เช็คว่าเป็น admin ไหม
      if (user.type === "teacher") {
        next();
        return;
      }
      return res
        .status(401)
        .send({ message: "Unauthorized access, require teacher roles" });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const isJudge = (req, res, next) => {
  try {
    User.findByPk(req.userId).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      //เช็คว่าเป็น admin ไหม
      if (user.type === "judge") {
        next();
        return;
      }
      return res
        .status(401)
        .send({ message: "Unauthorized access, require judge roles" });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


const authJwt = { verifyToken, isAdmin, isJudge, isTeacher };
export default authJwt;